// ProductService.js

const ProductRepository = require("../Repositories/ProductRepository");

/**
 * Get a product by its ID.
 * @param {string} id - Product ID.
 * @returns {Promise<object|null>} Product object or null if not found.
 */
const getProductById = async (id) => {
  return await ProductRepository.getProductById(id);
};

/**
 * Create a new product.
 * @param {object} productData - Product data (fields like title, description, price, etc.).
 * @returns {Promise<object>} Created product object.
 */
const createProduct = async (productData) => {
  return await ProductRepository.createProduct(productData);
};

/**
 * Update a product by its ID.
 * @param {string} id - Product ID.
 * @param {object} productData - Updated product data.
 * @returns {Promise<object|null>} Updated product object or null if not found.
 */
const updateProductById = async (id, productData) => {
  return await ProductRepository.updateProductById(id, productData);
};

/**
 * Delete a product by its ID.
 * @param {string} id - Product ID.
 * @returns {Promise<object|null>} Deleted product object or null if not found.
 */
const deleteProductById = async (id) => {
  return await ProductRepository.deleteProductById(id);
};

module.exports = {
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
// Path: server/Services/ProductService.js
