const ProductRepository = require("../Repositories/ProductRepository");
const CategoryRepository = require("../Repositories/CategoryRepository");

/**
 * Get a product by its ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<object>} The product object.
 */
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
  const categories = await CategoryRepository.getCategories();
  const category = categories.find(
    (cat) => cat.name === productData.categoryName
  );

  if (!category) {
    throw new Error("Category not found.");
  }

  productData.category = category._id;

  try {
    return await ProductRepository.createProduct(productData);
  } catch (error) {
    throw new Error("Failed to create a new product in the database.");
  }
};

/**
 * Create multiple products.
 * @param {Array<object>} productsData - Array of product data objects.
 * @returns {Promise<Array<object>>} Array of created product objects.
 */
const createProducts = async (productsData) => {
  try {
    const products = await Promise.all(
      productsData.map((productData) => createProduct(productData))
    );
    return products;
  } catch (error) {
    throw new Error("Failed to create products in the database.");
  }
};

/**
 * Get the title of a product by its ID.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<string>} The product title.
 */
const getProductTitleById = async (productId) => {
  try {
    const product = await ProductRepository.getProductById(productId);
    return product.title;
  } catch (error) {
    throw new Error("Failed to get product by id.");
  }
};

/**
 * Get all categories.
 * @returns {Promise<Array<object>>} Array of category objects.
 * @throws {Error} If there is an error getting the categories.
 */
const getCategories = async () => {
  try {
    return await CategoryRepository.getCategories();
  } catch (error) {
    throw new Error("Failed to get categories.");
  }
};

/**
 * Update the category of products.
 * @param {string} oldCategory - The old category name.
 * @param {string} newCategory - The new category name.
 * @returns {Promise<void>}
 */
const updateCategory = async (oldCategory, newCategory) => {
  try {
    await ProductRepository.updateCategory(oldCategory, newCategory);
  } catch (error) {
    throw new Error("Failed to update category.");
  }
};

/**
 * Update a product by its ID.
 * @param {string} productId - The ID of the product.
 * @param {object} productData - The product data to update.
 * @returns {Promise<object>} The updated product object.
 * @throws {Error} If there is an error updating the product.
 */
const updateProduct = async (productId, productData) => {
  try {
    const existingProduct = await ProductRepository.getProductById(productId);

    const updatedProduct = {
      ...existingProduct._doc,
      ...productData,
    };

    return await ProductRepository.updateProduct(productId, updatedProduct);
  } catch (error) {
    throw new Error("Failed to update product.");
  }
};

/**
 * Update the bought quantity of a product.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The quantity bought.
 * @returns {Promise<void>}
 * @throws {Error} If there is an error updating the product.
 */
const updateProductBought = async (productId, quantity) => {
  try {
    const product = await ProductRepository.getProductById(productId);

    product.bought += quantity;

    await ProductRepository.updateProduct(productId, product);
  } catch (error) {
    throw new Error("Failed to update product bought.");
  }
};

/**
 * Update the quantity of a product.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The quantity to update.
 * @returns {Promise<void>}
 * @throws {Error} If there is an error updating the product quantity.
 */
const updateProductQuantity = async (productId, quantity) => {
  try {
    const product = await ProductRepository.getProductById(productId);
    product.quantity -= quantity;

    if (product.quantity < 0) {
      throw new Error("Quantity cannot be less than 0.");
    }
    await ProductRepository.updateProduct(productId, product);
    return product;
  } catch (error) {
    throw new Error("Failed to update product quantity.");
  }
};

module.exports = {
  createProduct,
  getProducts,
  createProducts,
  getProductTitleById,
  getCategories,
  updateCategory,
  updateProduct,
  getProduct,
  updateProductBought,
  updateProductQuantity,
};

// Path: server/Services/ProductService.js
