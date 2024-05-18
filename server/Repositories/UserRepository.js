const User = require("../Models/UserModel");

/**
 * Get a user by their ID.
 * @param {string} id - User ID.
 * @returns {Promise<object|null>} User object or null if not found.
 */
const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    // Handle error (e.g., log, return default value, etc.)
    console.error("Error fetching user:", error.message);
    return null;
  }
};

/**
 * Create a new user.
 * @param {object} userData - User data (fields like username, email, etc.).
 * @returns {Promise<object>} Created user object.
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    // Handle error (e.g., log, throw, etc.)
    console.error("Error creating user:", error.message);
    throw error;
  }
};

/**
 * Update a user by their ID.
 * @param {string} id - User ID.
 * @param {object} userData - Updated user data.
 * @returns {Promise<object|null>} Updated user object or null if not found.
 */
const updateUserById = async (id, userData) => {
  try {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  } catch (error) {
    // Handle error (e.g., log, return default value, etc.)
    console.error("Error updating user:", error.message);
    return null;
  }
};

/**
 * Delete a user by their ID.
 * @param {string} id - User ID.
 * @returns {Promise<object|null>} Deleted user object or null if not found.
 */
const deleteUserById = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    // Handle error (e.g., log, return default value, etc.)
    console.error("Error deleting user:", error.message);
    return null;
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

// Path: server/Repositories/UserRepository.js
