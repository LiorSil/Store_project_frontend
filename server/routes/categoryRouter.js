const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

/**
 * @route GET /categories
 * @description Get all categories
 * @access Private
 */
router.get("/", authenticateUser, categoryController.getCategories);

/**
 * @route PATCH /categories
 * @description Update categories
 * @access Private (Admin only)
 */
router.patch(
  "/",
  authenticateUser,
  authorizeAdmin,
  categoryController.updateCategories
);

module.exports = router;
