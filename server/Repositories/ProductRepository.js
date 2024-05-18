const Product = require("../Models/ProductModel");

/**
 * Get a product by its ID.
 * @param {string} id - Product ID.
 * @returns {Promise<object|null>} Product object or null if not found.
 */
const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }
};

/**
 * Create a new product.
 * @param {object} productData - Product data (fields like name, description, price, etc.).
 * @returns {Promise<object>} Created product object.
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
 * Update a product by its ID.
 * @param {string} id - Product ID.
 * @param {object} productData - Updated product data.
 * @returns {Promise<object|null>} Updated product object or null if not found.
 */
const updateProductById = async (id, productData) => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return null;
  }
};

/**
 * Delete a product by its ID.
 * @param {string} id - Product ID.
 * @returns {Promise<object|null>} Deleted product object or null if not found.
 */
const deleteProductById = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return null;
  }
};

module.exports = {
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};

// Path: server/Repositories/ProductRepository.js
