const ProductService = require("../Services/ProductService");
const ImageService = require("../Services/ImageService");

/**
 * Creates a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Gets all products with their associated image URLs.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();

    const plainProducts = products.map((product) => product.toObject());
    const uniqueImageReferences = [
      ...new Set(plainProducts.map((product) => product.imageReference)),
    ];

    const imageUrlMap = await fetchImageUrls(uniqueImageReferences);

    const productsWithImages = plainProducts.map((product) => ({
      ...product,
      imageUrl: imageUrlMap[product.imageReference],
    }));

    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Helper function to fetch image URLs for each unique image reference.
 * @param {Array} uniqueImageReferences - Array of unique image references.
 * @returns {Object} - Map of image references to their URLs.
 */
const fetchImageUrls = async (uniqueImageReferences) => {
  const imageUrlMap = {};
  await Promise.all(
    uniqueImageReferences.map(async (ref) => {
      try {
        const imageUrl = await ImageService.getImage(ref);
        imageUrlMap[ref] = imageUrl;
      } catch (error) {
        imageUrlMap[ref] = null;
      }
    })
  );
  return imageUrlMap;
};

/**
 * Updates a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = req.body;
    const updatedProduct = await ProductService.updateProduct(
      productId,
      product
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Gets only bought products.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getOnlyBoughtProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    const boughtProducts = products.filter((product) => product.bought > 0);
    res.status(200).json(boughtProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  getOnlyBoughtProducts,
};
