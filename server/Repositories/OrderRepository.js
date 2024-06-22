const Order = require("../Models/OrderModel");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 */

const createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
};

/**
 * Get all order of a user
 * @param {String} userId - The id of the user
 * @returns {Promise<Array>} - The orders of the user
 */

const getOrdersByUserId = async (userId) => {
  try {
    return await Order.find({ customer: userId });
  } catch (error) {
    console.error("Error getting orders:", error.message);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
};
