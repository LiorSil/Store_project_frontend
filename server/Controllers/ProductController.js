const express = require("express");
const router = express.Router();
const ProductService = require("../Services/ProductService");
const ImageService = require("../Services/ImageService");

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
    const products = await ProductService.getProducts();

    // Convert each product to a plain JavaScript object
    const plainProducts = products.map((product) => product.toObject());
    // Remove duplicate image references
    const uniqueImageReferences = [
      ...new Set(plainProducts.map((product) => product.imageReference)),
    ];
    const imageUrls = await Promise.all(
      uniqueImageReferences.map((ref) => ImageService.getImage(ref))
    );
    const imageUrlMap = uniqueImageReferences.reduce((acc, ref, idx) => {
      acc[ref] = imageUrls[idx];
      return acc;
    }, {});
    const productsWithImages = plainProducts.map((product) => ({
      ...product,
      imageUrl: imageUrlMap[product.imageReference],
    }));

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
