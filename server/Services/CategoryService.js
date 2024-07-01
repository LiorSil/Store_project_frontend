const categoryRepository = require("../Repositories/CategoryRepository");

/**
 * Get all categories
 * @returns {Promise<Array>} - The categories
 */
const getCategories = async () => {
  try {
    return await categoryRepository.getCategories();
  } catch (error) {
    console.error("Error getting categories:", error.message);
    throw error;
  }
};

/**
 * Create a new category
 * @param {String} categoryName - The name of the category
 * @returns {Promise<Object>} - The created category
 */

const createCategory = async (categoryName) => {
  try {
    return await categoryRepository.createCategory(categoryName);
  } catch (error) {
    console.error("Error creating category:", error.message);
    throw error;
  }
};

module.exports = {
  getCategories,
  createCategory,
};
