exports.validateUpdateUser = (data) => {
  const errors = [];

  if (data.name && typeof data.name !== "string") {
    errors.push("Name must be a string");
  }

  if (data.name && data.name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  return errors;
};