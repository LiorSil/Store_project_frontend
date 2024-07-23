const userModel = require("../models/userModel");

/**
 * get all users
 * @returns
 * @throws {Error} If there was an error getting the users
 */
const getAllUsers = async () => {
  try {
    return await userModel.find();
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
    const user = new userModel(userData);
    return await user.save();
  } catch (error) {
    // Handle error (e.g., log, throw, etc.)
    console.error("Error creating user:", error.message);
    throw error;
  }
};

/**
 * Gets a user by their username
 * @description Ignores case when searching for the user
 * @param {*} username
 * @returns
 * @throws {Error} If there was an error getting the user
 */

const getUserByUsername = async (username) => {
  // Ignore case
  try {
    const user = await userModel.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    return user;
  } catch (error) {
    console.error("Error getting user.", error.message);
  }
};

/**
 * Gets a user by their ID
 * @param {*} userId
 * @returns
 * @throws {Error} If there was an error getting the user
 */

const getUserById = async (userId) => {
  const user = await userModel.findById(userId);
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
    return await userModel.findByIdAndUpdate(userId, userData);
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
    return await userModel.findByIdAndUpdate(
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
