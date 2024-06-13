const OrderService = require("../Services/OrderService");
const express = require("express");
const router = express.Router();

/**
 * Creates a new order in the database.
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The created order.
 * @throws {Error} - If the order could not be created.
 */

router.post("/", async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
