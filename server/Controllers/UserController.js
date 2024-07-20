const UserService = require("../Services/UserService");
const ProductService = require("../Services/ProductService");
const jwt = require("jsonwebtoken");

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const signUp = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    // Authenticate the user using the provided credentials
    const user = await UserService.authenticateUser(req.body);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    // Determine the status code based on the error message
    if (
      error.message ===
      "Failed to authenticate user: Invalid username or password."
    ) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};
const guest = async (req, res) => {
  try {
    const user = await UserService.getGuestUser();
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Gets a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.userId);

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
};

/**
 * Updates a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.user.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "Cannot update guest user.")
      res.status(412).send(error.message);
    else res.status(400).send(error.message);
  }
};

/**
 * Pushes products to a user's productsBought array.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const pushProducts = async (req, res) => {
  try {
    const { productsBought } = req.body;
    const user = await UserService.pushProductsToUser(
      req.user.userId,
      productsBought
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Gets only customers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getCustomersAndProducts = async (req, res) => {
  try {
    const users = await UserService.getCustomers();
    const products = await ProductService.getProducts();
    res.status(200).json({
      users,
      products,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  signUp,
  login,
  guest,
  getUser,
  updateUser,
  pushProducts,
  getCustomersAndProducts,
};
