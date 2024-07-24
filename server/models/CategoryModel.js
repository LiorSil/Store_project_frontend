const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    match: /^[a-zA-Z\s]+$/, // No numbers or special characters
  },
});

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
