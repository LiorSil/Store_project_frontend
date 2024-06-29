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

/**
 * Get all categories
 * @returns {Promise<Array>} - The categories
 * @throws {Error} - If there is an error getting the categories.
 */
const getCategories = async () => {
  try {
    return await ProductRepository.getCategories();
  } catch (error) {
    throw new Error("Failed to get categories.");
  }
};

/**
 * Update category of products
 * @param {String} oldCategory - The old category name
 * @param {String} newCategory - The new category name
 * @returns {Promise<void>}
 */
const updateCategory = async (oldCategory, newCategory) => {
  try {
    await ProductRepository.updateCategory(oldCategory, newCategory);
  } catch (error) {
    throw new Error("Failed to update category.");
  }
};

module.exports = {
  createProduct,
  getProducts,
  createProducts,
  getProductTitleById,
  getCategories,
  updateCategory,
};

// Path: server/Services/ProductService.js
