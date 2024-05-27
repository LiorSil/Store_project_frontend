const express = require("express");
const router = express.Router();
const ProductService = require("../Services/ProductService");

router.post("/createProducts", async (req, res) => {
  try {
    const products = await ProductService.createProducts(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
