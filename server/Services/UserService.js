// UserService.js

const UserRepository = require("../Repositories/UserRepo");

/**
 * Get a user by their ID.
 * @param {string} id - User ID.
 * @returns {Promise<object|null>} User object or null if not found.
 */
const getUserById = async (id) => {
  return await UserRepository.getUserById(id);
};

/**
 * Create a new user.
 * @param {object} userData - User data (fields like firstName , lastName, etc.).
 * @returns {Promise<object>} Created user object.
 */
const createUser = async (userData) => {
  return await UserRepository.createUser(userData);
};

/**
 * Update a user by their ID.
 * @param {string} id - User ID.
 * @param {object} userData - Updated user data.
 * @returns {Promise<object|null>} Updated user object or null if not found.
 */
const updateUserById = async (id, userData) => {
  return await UserRepository.updateUserById(id, userData);
};

/**
 * Delete a user by their ID.
 * @param {string} id - User ID.
 * @returns {Promise<object|null>} Deleted user object or null if not found.
 */
const deleteUserById = async (id) => {
  return await UserRepository.deleteUserById(id);
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
