const userService = require("../services/userService");

module.exports.handler = async (event) => {
  const userId = event.pathParameters.id;
  const body = JSON.parse(event.body);

  const updatedUser = await userService.updateUser(userId, body);

  return {
    statusCode: 200,
    body: JSON.stringify(updatedUser),
  };
};