// UserService.js

const UserRepository = require("../Repositories/UserRepository");

/**
 * get users that are customers (not admins)
 * @returns {Promise<object>} All customers.
 * @throws {Error} If there was an error getting the customers.
 */

const getCustomers = async () => {
  try {
    const users = await UserRepository.getAllUsers();
    const customers = users.filter((user) => !user.isAdmin);
    return customers;
  } catch (error) {
    throw new Error("Failed to get customers from the database.");
  }
};

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

/**
 * Authenticate a user.
 * @param {object} userData - User data (fields like username and password).
 * @returns {Promise<object>} Authenticated user object.
 * @throws {Error} If the user is not found or the password is invalid.
 */

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

/**
 * Get a user by their ID.
 * @param {string} userId - User ID.
 * @returns {Promise<object>} User object.
 * @throws {Error} If the user is not found.
 */

const getUserById = async (userId) => {
  let user = await UserRepository.getUserById(userId);
  // Remove _id from user object
  user = user.toObject();

  return user;
};

/**
 * Update a user by their ID.
 * @param {string} userId - User ID.
 * @param {object} userData - User data (fields like firstName , lastName, etc.).
 * @returns {Promise<object>} Updated user object.
 * @throws {Error} If the user is not found or the update fails.
 */

const updateUser = async (userId, userData) => {
  const oldUser = await UserRepository.getUserById(userId);
  if (!oldUser) {
    throw new Error("User not found.");
  }

  try {
    const updatedUser = await UserRepository.updateUser(userId, userData);
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user in the database.");
  }
};

/**
 * push a product or products to a user's productsBought array.
 * @param {string} userId - User ID.
 * @param {object} productData - Product data (fields like product, quantity, date).
 * @returns {Promise<object>} Updated user object.
 * @throws {Error} If the update fails.
 */

const pushProductsToUser = async (userId, productData) => {
  console.log("pushProductsToUser -> productData", productData);
  try {
    return await UserRepository.pushProductToUser(userId, productData);
  } catch (error) {
    throw new Error("Failed to update user in the database.");
  }
};

module.exports = {
  getCustomers,
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
  pushProductsToUser,
};
