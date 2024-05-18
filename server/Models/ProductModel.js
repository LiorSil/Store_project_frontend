const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid product title!`,
    },
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid category!`,
    },
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

  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema, "products");
