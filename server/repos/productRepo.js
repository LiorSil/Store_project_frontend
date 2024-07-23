const productModel = require("../models/productModel");

/**
 * Retrieves a product from the database.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Promise<Object>} - The product object.
 */

const getProduct = async (productId) => {
  return await productModel.findById(productId);
};

/**
 * Retrieves all products from the database.
 * @returns {Promise<Array<Object>>} - The array of products.
 */
const getProducts = async () => {
  return await productModel.find();
};

/**
 * Creates a new product in the database.
 * @param {Object} productData - The data of the product to be created.
 * @returns {Promise<Object>} - The created product.
 * @throws {Error} - If there is an error creating the product.
 */
const createProduct = async (productData) => {
  try {
    const product = new productModel(productData);
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
    return await productModel.findById(productId);
  } catch (error) {
    console.error("Error getting product by id:", error.message);
    throw error;
  }
};

/**
 * Get all categories
 * @returns {Promise<Array>} - The categories
 * @throws {Error} - If there is an error getting the categories.
 */
const getCategories = async () => {
  try {
    return await productModel.distinct("category");
  } catch (error) {
    console.error("Error getting categories:", error.message);
    throw error;
  }
};

/**
 * Update category of products
 * @param {String} prevCategory - The previous category
 * @param {String} newCategory - The new category
 * @returns {Promise<Object>} - The updated products
 * @throws {Error} - If there is an error updating the category.
 */

const updateCategory = async (prevCategory, newCategory) => {
  try {
    return await productModel.updateMany(
      { category: prevCategory },
      { category: newCategory }
    );
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

/**
 * update category name by category
 * @param {*} categoryId
 * @param {*} newCategoryName
 * @returns
 * @throws {Error} - If there is an error updating the category.
 */

const updateCategoryNameByCategoryId = async (categoryId, newCategoryName) => {
  try {
    return await productModel.updateMany(
      { category: categoryId },
      { categoryName: newCategoryName }
    );
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

/**
 * Update product
 * @param {String} productId - The id of the product
 * @param {Object} productData - The data of the product
 * @returns {Promise<Object>} - The updated product
 * @throws {Error} - If there is an error updating the product.
 */

const updateProduct = async (productId, productData) => {
  try {
    return await productModel.findByIdAndUpdate(productId, productData);
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw error;
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  getProductById,
  getCategories,
  updateCategory,
  updateCategoryNameByCategoryId,
  updateProduct,
};

// Path: server/Repositories/ProductRepository.js
