const CategoryModel = require("../Models/CategoryModel");
/**
 * Retrieves all categories from the database.
 * @returns {Promise<Array<Object>>} - The array of categories.
 */
const getCategories = async () => {
  return await CategoryModel.find();
};

/**
 * Creates a new category in the database.
 * @param {Object} categoryName - The data of the category to be created.
 * @returns {Promise<Object>} - The created category.
 * @throws {Error} - If there is an error creating the category.
 */

const createCategory = async (categoryName) => {
  try {
    const category = new CategoryModel({
      name: categoryName,
    });

    return await category.save();
  } catch (error) {
    console.error("Error creating category:", error.message);
    throw error;
  }
};

module.exports = {
  getCategories,
  createCategory,
};
