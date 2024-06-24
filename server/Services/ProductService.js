const ProductRepository = require("../Repositories/ProductRepository");

const getProduct = async (productId) => {
  return await ProductRepository.getProduct(productId);
};

/**
 * Get all products.
 * @returns {Promise<Array<object>>} Array of product objects.
 */
const getProducts = async () => {
  return await ProductRepository.getProducts();
};

/**
 * Create a new product.
 * @param {object} productData - Product data (fields like title, category, etc.).
 * @returns {Promise<object>} Created product object.
 */

const createProduct = async (productData) => {
  try {
    return await ProductRepository.createProduct(productData);
  } catch (error) {
    throw new Error("Failed to create a new product in the database.");
  }
};

/**
 * Create multiple products.
 * @param {Array<object>} productsData - Array of product data objects.
 * @returns {Promise<void>}
 */
const createProducts = async (productsData) => {
  try {
    const products = await Promise.all(
      productsData.map((productData) =>
        ProductRepository.createProduct(productData)
      )
    );
    return products;
  } catch (error) {
    throw new Error("Failed to create products in the database.");
  }
};

/**
 * Get pdoct by id
 * @param {String} productId - The id of the product
 * @returns {Promise<Object>} - The product
 */
const getProductTitleById = async (productId) => {
  try {
    const product = await ProductRepository.getProductById(productId);
    return await product.title;
  } catch (error) {
    throw new Error("Failed to get product by id.");
  }
};

module.exports = {
  createProduct,
  getProducts,
  createProducts,
  getProductTitleById,
};

// Path: server/Services/ProductService.js
