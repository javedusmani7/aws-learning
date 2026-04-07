const userService = require("../services/userService");

module.exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: userService.getMessage(),
    }),
  };
};