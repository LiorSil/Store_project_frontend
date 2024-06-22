const OrderRepository = require("../Repositories/OrderRepository");
const UserService = require("./UserService");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 */

const createOrder = async (orderData) => {
  const user = await UserService.getUserById(orderData.customer.toString());
  if (user && user.customerRegisterDate) {
    orderData.customerRegisterDate = user.customerRegisterDate;
    console.log(
      "Customer register date is available for this user",
      orderData.customerRegisterDate
    );
  } else {
    console.log("Customer register date is not available for this user.");
  }

  if (orderData.items && orderData.items.length > 0) {
    orderData.items = orderData.items.map((item) => {
      item.productId = item.productId.toString();
      return item;
    });
  }
  //if orderData.items is a single object
  else if (orderData.items) {
    orderData.items.productId = orderData.items.productId.toString();
  } else {
    orderData.items = [];
  }
  return await OrderRepository.createOrder(orderData);
};

/**
 * Get all orders of a user
 * @param {String} userId - The id of the user
 * @returns {Promise<Array>} - The orders of the user
 */

const getOrdersByUserId = async (userId) => {
  try {
    return await OrderRepository.getOrdersByUserId(userId);
  } catch (error) {
    console.error("Error getting orders:", error.message);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
};
