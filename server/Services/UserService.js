// UserService.js

const UserRepository = require("../Repositories/UserRepository");

/**
 * Create a new user.
 * @param {object} userData - User data (fields like firstName , lastName, etc.).
 * @returns {Promise<object>} Created user object.
 */
const createUser = async (userData) => {
  try {
    return await UserRepository.createUser(userData);
  } catch (error) {
    throw new Error("Failed to create a new user in the database.");
  }
};

const authenticateUser = async (userData) => {
  const user = await UserRepository.getUserByUsername(userData.username);
  if (!user) {
    throw new Error("User not found.");
  }
  if (user.password !== userData.password) {
    throw new Error("Invalid password.");
  }
  return user;
};

const getUserById = async (userId) => {
  let user = await UserRepository.getUserById(userId);
  // Remove _id from user object
  user = user.toObject();

  return user;
};

const updateUser = async (userId, userData) => {
  const oldUser = await UserRepository.getUserById(userId);
  if (!oldUser) {
    throw new Error("User not found.");
  }
  userData = { ...oldUser, ...userData };

  try {
    return await UserRepository.updateUser(userId, userData);
  } catch (error) {
    throw new Error("Failed to update user in the database.");
  }
};

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
};
