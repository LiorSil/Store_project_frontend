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


module.exports = {
  createUser,
  authenticateUser,
};
