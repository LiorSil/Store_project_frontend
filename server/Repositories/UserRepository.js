const User = require("../Models/UserModel");

/**
 * get all users
 * @returns
 * @throws {Error} If there was an error getting the users
 */
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Error getting users:", error.message);
    throw error;
  }
};

/**
 * Creates a new user
 * @param {*} userData
 * @returns
 * @throws {Error} If there was an error creating the user
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
 * Gets a user by their username
 * @param {*} username
 * @returns
 * @throws {Error} If there was an error getting the user
 */

const getUserByUsername = async (username) => {
  return await User.findOne({ username: username });
};

/**
 * Gets a user by their ID
 * @param {*} userId
 * @returns
 * @throws {Error} If there was an error getting the user
 */

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

/**
 * Updates a user by their ID
 * @param {*} userId
 * @param {*} userData
 * @returns
 * @throws {Error} If there was an error updating the user
 */

const updateUser = async (userId, userData) => {
  try {
    return await User.findByIdAndUpdate(userId, userData);
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

/**
 * Pushes a product to a user's productsBought array or a single product
 * @param {*} userId
 * @param {*} products
 * @returns
 */

const pushProductToUser = async (userId, products) => {
 
  try {
    return await User.findByIdAndUpdate(
      userId,
      { $push: { productsBought: { $each: products } } },
      { new: true, useFindAndModify: false }
    );
  } catch (error) {
    throw new Error("Failed to update user in the database.");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  pushProductToUser,
};

// Path: server/Repositories/UserRepository.js
