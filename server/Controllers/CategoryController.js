const categoryService = require("../Services/CategoryService");

/**
 * Get all categories.
 */
const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Update categories.
 */
const updateCategories = async (req, res) => {
  try {
    const categories = req.body;
    const updatedCategory = await categoryService.updateCategories(categories);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getCategories,
  updateCategories,
};
