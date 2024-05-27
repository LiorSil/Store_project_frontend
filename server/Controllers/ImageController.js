const express = require("express");
const router = express.Router();
const ImageService = require("../Services/ImageService");

// POST /upload route for uploading an image
router.post("/upload", async (req, res) => {
  const { filename, contentType, size } = req.body;
  try {
    const image = await ImageService.uploadImage(filename, contentType, size);
    res.status(201).json(image);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
