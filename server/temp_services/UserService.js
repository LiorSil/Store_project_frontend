// UserService.js
// Ensure you have bcrypt installed and required

const userRepo = require("../repos/userRepo");

/**
 * get users that are customers (not admins)
 * @returns {Promise<object>} All customers.
 * @throws {Error} If there was an error getting the customers.
 */

const getCustomers = async () => {
  try {
    const users = await userRepo.getAllUsers();
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
    return await userRepo.createUser(userData);
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
  try {
    const user = await userRepo.getUserByUsername(userData.username);

    if (!user) {
      throw new Error("User not found.");
    }
    const isPasswordValid = (await userData.password) === user.password;

    if (!isPasswordValid) {
      throw new Error("Invalid username or password.");
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to authenticate user: ${error.message}`);
  }
};

const getGuestUser = async () => {
  try {
    const user = await userRepo.getUserByUsername("guest");
    if (!user) {
      throw new Error("Guest user not found.");
    } else {
      return user;
    }
  } catch (error) {
    throw new Error("Failed to get guest user.");
  }
};

/**
 * Get a user by their ID.
 * @param {string} userId - User ID.
 * @returns {Promise<object>} User object.
 * @throws {Error} If the user is not found.
 */

const getUserById = async (userId) => {
  let user = await userRepo.getUserById(userId);
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
  const oldUser = await userRepo.getUserById(userId);
  if (oldUser.username === "guest") {
    throw new Error("Cannot update guest user.");
  }
  if (!oldUser) {
    throw new Error("User not found.");
  }

  try {
    const updatedUser = await userRepo.updateUser(userId, userData);
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
  try {
    return await userRepo.pushProductToUser(userId, productData);
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
  getGuestUser,
};
