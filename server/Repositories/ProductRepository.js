const Product = require("../Models/ProductModel");



/**
 * Creates a new product in the database.
 * @param {Object} productData - The data of the product to be created.
 * @returns {Promise<Object>} - The created product.
 * @throws {Error} - If there is an error creating the product.
 */
const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
};

/**
 * Retrieves all products from the database.
 * @returns {Promise<Array<Object>>} - The array of products.
 */
const getProducts = async () => {
  return await Product.find();
}

module.exports = {
  createProduct,
  getProducts,
};

// Path: server/Repositories/ProductRepository.js




