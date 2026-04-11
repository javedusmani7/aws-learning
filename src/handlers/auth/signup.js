require("dotenv").config();
const { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");
const { createUser } = require("../../repositories/userRepository");
const { sendUserCreatedEvent } = require("../../services/sqsService");

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

console.log("ENV:", process.env);
console.log("USER_POOL_ID:", process.env.COGNITO_USER_POOL_ID);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password, name } = body;

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email and password are required" }),
      };
    }

     // ✅ Step 1: Create user in Cognito
    const signUpRes = await client.send(
      new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "name", Value: name || "" },
        ],
      })
    );

    // ✅ Step 2: Confirm user
    await client.send(
      new AdminConfirmSignUpCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: email,
      })
    );
    
    // ✅ Step 3: Save in DB
    const user = {
      userId: signUpRes.UserSub,
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    await createUser(user);

    // ✅ Step 4: Send message to SQS
    await sendUserCreatedEvent({
      userId: user.userId,
      email: user.email,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully",
        user,
      }),
    };
  }
  catch (error) {
    console.error("Signup Error:", error);

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: error.message || "Signup failed",
      }),
    };
  }
};