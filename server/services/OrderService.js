const orderRepo = require("../repos/orderRepo");
const userService = require("./userService");
const productService = require("./productService");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 */

const createOrder = async (orderData) => {
  const user = await userService.getUserById(orderData.customer.toString());

  if (user && user.customerRegisterDate) {
    orderData.customerRegisterDate = user.customerRegisterDate;
  } else {
    console.log("Customer register date is not available for this user.");
  }

  if (
    orderData.items &&
    Array.isArray(orderData.items) &&
    orderData.items.length > 0
  ) {
    orderData.items = await Promise.all(
      orderData.items.map(async (item) => {
        item.title = await productService.getProductTitleById(item.productId);
        return item;
      })
    );
  } else {
    orderData.items = [];
  }

  const userProductsBought = await Promise.all(
    orderData.items.map(async (item) => {
      await productService.updateProductQuantity(item.productId, item.quantity);
      await productService.updateProductBought(item.productId, item.quantity);

      return {
        productId: item.productId,
        quantity: item.quantity,
        orderDate: orderData.orderDate,
        title: item.title,
      };
    })
  );

  await userService.pushProductsToUser(user, userProductsBought);

  return await orderRepo.createOrder(orderData);
};

/**
 * Get all orders of a user
 * @param {String} userId - The id of the user
 * @returns {Promise<Array>} - The orders of the user
 */

const getOrdersByUserId = async (userId) => {
  try {
    return await orderRepo.getOrdersByUserId(userId);
  } catch (error) {
    console.error("Error getting orders:", error.message);
    throw error;
  }
};

/**
 * Get all orders
 * @returns {Promise<Array>} - The orders
 * @throws {Error} - The error
 */

const getOrders = async () => {
  try {
    return await orderRepo.getOrders();
  } catch (error) {
    console.error("Error getting orders:", error.message);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrders,
};
