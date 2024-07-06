const OrderService = require("../Services/OrderService");
const express = require("express");
const router = express.Router();
const validateToken = require("../Services/Util");

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 * @throws {Error} - If the order could not be created.
 */

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }

    req.body.customer = decodedToken.userId;
    const order = await OrderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get all orders
 * @returns {Promise<Array>} - The orders
 * @throws {Error} - If the orders could not be retrieved.
 */
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const orders = await OrderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get all orders of a user
 * @returns {Promise<Array>} - The orders of the user
 * @throws {Error} - If the orders could not be retrieved.
 */

router.get("/getCustomerOrders", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const orders = await OrderService.getOrdersByUserId(decodedToken.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
