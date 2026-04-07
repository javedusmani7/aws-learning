const userService = require("../services/userService");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const user = await userService.createUser(body);

  return {
    statusCode: 201,
    body: JSON.stringify(user),
  };
};