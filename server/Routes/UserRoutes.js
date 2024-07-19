const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const { authenticateUser } = require("../Middlewares/authMiddleware");

/**
 * @route POST /users/signUp
 * @description Create a new user
 * @access Public
 */
router.post("/signUp", UserController.signUp);

/**
 * @route POST /users/login
 * @description Authenticate a user
 * @access Public
 */
router.post("/login", UserController.login);

/**
 * @route GET /users/getUser
 * @description Get a user by their ID
 * @access Private
 */
router.get("/getUser", authenticateUser, UserController.getUser);

/**
 * @route PUT /users/updateUser
 * @description Update a user by their ID
 * @access Private
 */
router.put("/updateUser", authenticateUser, UserController.updateUser);

/**
 * @route PUT /users/pushProducts
 * @description Push products to a user's productsBought array
 * @access Private
 */
router.put("/pushProducts", authenticateUser, UserController.pushProducts);

/**
 * @route GET /users/customersAndProducts
 * @description Get only customers and products
 * @access Private
 */
router.get(
  "/customersAndProducts",
  authenticateUser,
  UserController.getCustomersAndProducts
);

module.exports = router;