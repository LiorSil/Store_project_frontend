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

module.exports = {
  createOrder,
};
