const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
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

/**
 * Updates a category in the database.
 * @param {Object} category - The data of the category to be updated.
 * @returns {Promise<Object>} - The updated category.
 
 * @throws {Error} - If there is an error updating the category.
 */

const updateCategory = async (category) => {
  try {
    await CategoryModel.findByIdAndUpdate(category._id, category);
    const products = await ProductModel.find({ category: category._id });
    products.forEach(async (product) => {
      product.categoryName = category.name;
      await ProductModel.findByIdAndUpdate(product._id, product);
    });
    return category;
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

/**
 * Deletes a category from the database.
 * @param {Object} category - The data of the category to be deleted.
 * @returns {Promise<Object>} - The deleted category.
 * @throws {Error} - If there is an error deleting the category.
 */

const deleteCategory = async (category) => {
  try {
    return await CategoryModel.findByIdAndDelete(category._id);
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
