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

/**
 * Authenticates a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const login = async (req, res) => {
  try {
    const user = await UserService.authenticateUser(req.body);
    if (!user) {
      throw new Error("Invalid username or password.");
    }
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
    res.status(400).send(error.message);
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
  getUser,
  updateUser,
  pushProducts,
  getCustomersAndProducts,
};
