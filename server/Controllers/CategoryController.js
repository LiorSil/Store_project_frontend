const categoryService = require("../Services/CategoryService");
const express = require("express");
const router = express.Router();
const validateToken = require("../Services/Util");

/**
 * Route to get all categories.
 */
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Route to create a new category.
 */

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const categories = req.body;
    const updatedCategory = await categoryService.updateCategories(categories);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
