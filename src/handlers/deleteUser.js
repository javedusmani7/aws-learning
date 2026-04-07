const userService = require("../services/userService");

module.exports.handler = async (event) => {
  const userId = event.pathParameters.id;

  const response = await userService.deleteUser(userId);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};