const express = require("express");
const router = express.Router();
const UserService = require("../Services/UserService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Create a new user.
 * @route POST /signUp
 * @group UserService - Operations about user
 * @param {User.model} user.body.required - User object
 * @returns {object} 201 - Created user object
 * @returns {Error} 400 - Invalid user data
 */

router.post("/signUp", async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Authenticate a user.
 * @route POST /login
 * @group UserService - Operations about user
 * @param {User.model} user.body.required - User object
 * @returns {object} 200 - Token and isAdmin
 * @returns {Error} 400 - Invalid username or password
 */

router.post("/login", async (req, res) => {
  try {
    const user = await UserService.authenticateUser(req.body);
    const token = jwt.sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get a user by their ID.
 * @route GET /getUser
 * @group UserService - Operations about user
 * @returns {object} 200 - User object
 * @returns {Error} 400 - Not authenticated
 * @security JWT
 * @produces application/json
 */

router.get("/getUser", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not authenticated.");
    }
    req.userId = decodedToken.userId;
    const user = await UserService.getUserById(req.userId);

    const clientUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      allowOrders: user.allowOthersToSeePurchasedProducts,
    };

    res.status(200).json(clientUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Update a user by their ID.
 * @route PUT /updateUser
 * @group UserService - Operations about user
 * @param {User.model} user.body.required - User object
 * @returns {object} 200 - Updated user object
 * @returns {Error} 400 - Not authenticated
 * @security JWT
 * @produces application/json
 */

router.put("/updateUser", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not authenticated.");
    }
    req.userId = decodedToken.userId;

    const user = await UserService.updateUser(req.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Push products to a user's productsBought array.
 * @route PUT /pushProducts
 * @group UserService - Operations about user
 * @param {User.model} user.body.required - User object
 * @returns {object} 200 - Updated user object
 * @returns {Error} 400 - Not authenticated
 * @security JWT
 * @produces application/json
 */

router.put("/pushProducts", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not Authorized.");
    }
    const userId = decodedToken.userId;
    const { productsBought } = req.body;

    const user = await UserService.pushProductsToUser(userId, productsBought);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * get only customers
 * @route GET /customers
 * @group UserService - Operations about user
 * @returns {object} 200 - customers array
 * @returns {Error} 400 - Not authenticated
 * @security JWT
 * @produces application/json
 */

router.get("/customers", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not authenticated.");
    }
    const users = await UserService.getCustomers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
