const {
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

const userService = require("../../services/userService");
const { success, error } = require("../../utils/response");

exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    // ✅ Step 1: Delete from DB first
    await userService.deleteUser(userId);

    // ✅ Step 2: Delete from Cognito
    await client.send(
        new AdminDeleteUserCommand({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: event.requestContext.authorizer.jwt.claims.email,
        })
    );

    return success({
      message: "User deleted successfully",
    });

  } catch (err) {
    console.error("DeleteMe Error:", err);
    return error("Failed to delete user");
  }
};