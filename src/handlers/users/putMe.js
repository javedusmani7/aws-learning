const userService = require("../../services/userService");
const { validateUpdateUser } = require("../../utils/validator");
const { success, error } = require("../../utils/response");

exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    const body = JSON.parse(event.body);

    // ✅ Validation
    const errors = validateUpdateUser(body);
    if (errors.length > 0) {
      return error(errors.join(", "), 400);
    }

    // ✅ Update user
    const updatedUser = await userService.updateUser(userId, body);

    return success({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("UpdateMe Error:", err);
    return error("Failed to update user");
  }
};