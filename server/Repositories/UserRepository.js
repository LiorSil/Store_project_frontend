const User = require("../Models/UserModel");

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

const getUserByUsername = async (username) => {
  return await User.findOne({ username: username });
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};
const updateUser = async (userId, userData) => {
  try {
    return await User.findByIdAndUpdate(userId, userData);
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
};

// Path: server/Repositories/UserRepository.js
