const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },

  categoryName: {
    type: String,
    ref: "Category", // Reference to the Category model
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
    min: 0,
    required: true,
  },

  bought: {
    type: Number,
    default: 0,
    required: false,
  },
  imageReference: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
