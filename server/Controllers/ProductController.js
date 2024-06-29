const express = require("express");
const router = express.Router();
const ProductService = require("../Services/ProductService");
const ImageService = require("../Services/ImageService");
const validateToken = require("../Services/Util");

router.post("/createProducts", async (req, res) => {
  try {
    const products = await ProductService.createProducts(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Route to get all products with their associated image URLs.
 * This endpoint fetches product data from the ProductService and
 * their corresponding image URLs from the ImageService.
 */
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }

    const products = await ProductService.getProducts();

    // Convert each product to a plain JavaScript object
    const plainProducts = products.map((product) => product.toObject());
    // Remove duplicate image references
    const uniqueImageReferences = [
      ...new Set(plainProducts.map((product) => product.imageReference)),
    ];
    const imageUrlMap = {};
    for (const ref of uniqueImageReferences) {
      try {
        const imageUrl = await ImageService.getImage(ref);
        imageUrlMap[ref] = imageUrl;
      } catch (error) {
        // If fetching image fails, set imageUrl to null
        imageUrlMap[ref] = null;
      }
    }

    const productsWithImages = plainProducts.map((product) => ({
      ...product,
      imageUrl: imageUrlMap[product.imageReference],
    }));

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const categories = await ProductService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/categories/updateCategory", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    await ProductService.updateCategory(
      req.body.oldCategory,
      req.body.newCategory
    );
    res.status(200).send("Category updated successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

// Path: Server/Services/ProductService.js
