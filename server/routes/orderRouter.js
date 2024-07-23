const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authenticateUser");
const OrderController = require("../controllers/orderController");

/**
 * @route POST /orders
 * @description Create a new order
 * @access Private
 */
router.post("/", authenticateUser, OrderController.createOrder);

/**
 * @route GET /orders
 * @description Get all orders
 * @access Private
 */
router.get("/", authenticateUser, OrderController.getOrders);

/**
 * @route GET /orders/getProductsFromOrders
 * @description Get all products of the user from all his orders (transformed)
 * @access Private
 */
router.get(
  "/getProductsFromOrders",
  authenticateUser,
  OrderController.getProductsFromOrders
);

module.exports = router;
