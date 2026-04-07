const userService = require("../services/userService");

module.exports.handler = async (event) => {
  const userId = event.pathParameters.id;

  const user = await userService.getUser(userId);

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};