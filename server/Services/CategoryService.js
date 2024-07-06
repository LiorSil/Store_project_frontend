const categoryRepository = require("../Repositories/CategoryRepository");
const productRepository = require("../Repositories/ProductRepository");

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

/**
 * Update a category
 * @param {Object} category - The category to update
 * @returns {Promise<Object>} - The updated category
 */
const updateCategory = async (category) => {
  try {
    return await categoryRepository.updateCategory(category);
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

/**
 * Delete a category
 * @param {Object} category - The category to delete
 * @returns {Promise<Object>} - The deleted category
 */
const deleteCategory = async (category) => {
  try {
    return await categoryRepository.deleteCategory(category);
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};

/**
 * Handle update , create and delete categories at the same time
 * @param {Array<Object>} categories - The categories to update, create and delete
 * @returns {Promise<Array>} - The updated categories
 * @throws {Error} - If there is an error updating, creating or deleting the categories
 */

const updateCategories = async (categories) => {
  //only new categories has unique property "new"
  const newCategories = categories.filter((cat) => cat.isNew && !cat.isDeleted);
  const updatedCategories = categories.filter(
    (cat) => cat.isDirty && !cat.isNew && !cat.isDeleted
  );
  const deletedCategories = categories.filter((cat) => cat.isDeleted);

  await Promise.all(newCategories.map((cat) => createCategory(cat.name)));

  await Promise.all(
    updatedCategories.map((cat) =>
      updateCategory({ _id: cat._id, name: cat.name }).catch((err) =>
        console.error(err)
      )
    )
  );

  await Promise.all(deletedCategories.map((cat) => deleteCategory(cat)));

  return getCategories();
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategories,
};
