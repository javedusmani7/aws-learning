const userRepository = require("../../repositories/userRepository");

exports.handler = async (event) => {
  try {
    // 🔥 Extract user from JWT (MOST IMPORTANT LINE)
    const claims = event.requestContext.authorizer.jwt.claims;

    const userId = claims.sub;   // Cognito userId
    const email = claims.email;

    // 🔍 Fetch from DynamoDB
    const user = await userRepository.getUser(userId);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User fetched successfully",
        user,
        // optional debug info
        tokenData: {
          userId,
          email,
        },
      }),
    };

  } catch (error) {
    console.error("GetMe Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch user",
      }),
    };
  }
};