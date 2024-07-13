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
  let quantityIsValid = true;
  const user = await UserService.getUserById(orderData.customer.toString());
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
        item.productId = item.productId.toString();
        item.title = await ProductService.getProductTitleById(item.productId);

        return item;
      })
    );
  } else {
    orderData.items = [];
  }

  const userProductsBought = orderData.items.map(async (item) => {
    await ProductService.updateProductQuantity(item.productId, item.quantity);
    await ProductService.updateProductBought(item.productId, item.quantity);
    return {
      productId: item.productId,
      quantity: item.quantity,
      orderDate: orderData.orderDate,
    };
  });

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
