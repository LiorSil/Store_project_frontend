const orderService = require("../services/orderService");

/**
 * Creates a new order in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createOrder = async (req, res) => {
  try {
    req.body.customer = req.user.userId;
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Get all orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Get all products of the user from all his orders (transformed).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProductsFromOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user.userId);
    let products = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        let product = {
          key: item.productId,
          title: item.title,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          total: item.quantity * item.price,
          date: order.orderDate,
        };
        products.push(product);
      });
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getProductsFromOrders,
};
