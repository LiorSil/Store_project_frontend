const ProductModel = require("../Models/ProductModel");

/**
 * Retrieves a product from the database.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Promise<Object>} - The product object.
 */

const getProduct = async (productId) => {
  return await ProductModel.findById(productId);
};

/**
 * Retrieves all products from the database.
 * @returns {Promise<Array<Object>>} - The array of products.
 */
const getProducts = async () => {
  return await ProductModel.find();
};

/**
 * Creates a new product in the database.
 * @param {Object} productData - The data of the product to be created.
 * @returns {Promise<Object>} - The created product.
 * @throws {Error} - If there is an error creating the product.
 */
const createProduct = async (productData) => {
  try {
    const product = new ProductModel(productData);
    return await product.save();
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
};

/**
 * Get product by id
 * @param {String} productId - The id of the product
 * @returns {Promise<Object>} - The product
 */
const getProductById = async (productId) => {
  try {
    return await ProductModel.findById(productId);
  } catch (error) {
    console.error("Error getting product by id:", error.message);
    throw error;
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  getProductById,
};

// Path: server/Repositories/ProductRepository.js
