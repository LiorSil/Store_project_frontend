const OrderRepository = require("../Repositories/OrderRepository");
const UserService = require("./UserService");
const ProductService = require("./ProductService");
const ImageService = require("./ImageService");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 */

const createOrder = async (orderData) => {
  const user = await UserService.getUserById(orderData.customer.toString());
  if (user && user.customerRegisterDate) {
    orderData.customerRegisterDate = user.customerRegisterDate;
  } else {
    console.log("Customer register date is not available for this user.");
  }

  if (orderData.items && orderData.items.length > 0) {
    orderData.items = await Promise.all(
      orderData.items.map(async (item) => {
        item.productId = await item.productId.toString();
        item.title = await ProductService.getProductTitleById(item.productId);
        item.imageUrl = await item.imageUrl;
        return item;
      })
    );
  }
  //if orderData.items is a single object
  else if (orderData.items) {
    orderData.items.productId = orderData.items.productId.toString();
    orderData.items.title = await ProductService.getProductTitleById();
  } else {
    orderData.items = [];
  }

  const userProductsBought = orderData.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    orderDate: orderData.orderDate,
  }));
  await UserService.pushProductsToUser(orderData.customer, userProductsBought);

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

/**
 * Get all orders
 * @returns {Promise<Array>} - The orders
 * @throws {Error} - The error
 */

const getOrders = async () => {
  try {
    return await OrderRepository.getOrders();
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
