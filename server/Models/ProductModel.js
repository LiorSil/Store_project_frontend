const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },

  bought: {
    type: Number,
    required: true,
  },
  imageReference: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

/**
  * Product Model:
  * title: String
  * category: String
  * description: String
  * price: Number
  * quantity: Number
  * image: String
  * bought: Number
 */

