const { getStorage, ref, getDownloadURL } = require("firebase/storage");

/**
 * Gets the download URL for an image reference.
 * @param {string} imageReference - The reference of the image.
 * @returns {Promise<string>} - The download URL of the image.
 * @throws {Error} - If the image URL could not be fetched.
 */
const getImage = async (imageReference) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${imageReference}`);
  try {
    return await getDownloadURL(imageRef);
  } catch (error) {
    throw new Error("Failed to get image URL.");
  }
};

module.exports = {
  getImage,
};
