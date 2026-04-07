const crypto = require("crypto");
const userRepo = require("../repositories/userRepository");

exports.createUser = async (data) => {
  const user = {
    userId: crypto.randomUUID(),
    name: data.name,
  };

  return await userRepo.createUser(user);
};

exports.getUser = async (userId) => {
  return await userRepo.getUser(userId);
};

exports.getMessage = () => {
  return "User service working ✅";
};