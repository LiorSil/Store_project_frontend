const OrderRepository = require("../Repositories/OrderRepository");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 */

const createOrder = async (orderData) => {
  orderData.customer = orderData.customer.toString();
  //if orderData.items is an array of objects
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
  orderData.orderDate = new Date();
  console.log("orderData", orderData);

  return await OrderRepository.createOrder(orderData);
};

module.exports = {
  createOrder,
};
