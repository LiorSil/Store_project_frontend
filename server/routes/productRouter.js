const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const { authenticateUser } = require("../middlewares/authMiddleware");

/**
 * @route POST /products
 * @description Create a new product
 * @access Private
 */
router.post("/", authenticateUser, ProductController.createProduct);

/**
 * @route GET /products
 * @description Get all products with their associated image URLs
 * @access Private
 */
router.get("/", authenticateUser, ProductController.getProducts);

/**
 * @route PUT /products/:id
 * @description Update a product by ID
 * @access Private
 */
router.put("/:id", authenticateUser, ProductController.updateProduct);

/**
 * @route GET /products/onlyBoughtProducts
 * @description Get only bought products
 * @access Private
 */
router.get(
  "/onlyBoughtProducts",
  authenticateUser,
  ProductController.getOnlyBoughtProducts
);

module.exports = router;
