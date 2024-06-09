const { getStorage, ref, getDownloadURL } = require("firebase/storage");

const getImage = async (imageReference) => {
  const storage = getStorage();
  const imagesRef = ref(storage, `images/${imageReference}`);
  try {
    const url = await getDownloadURL(imagesRef);
    return url;
  } catch (error) {
    throw new Error("Failed to get image URL.");
  }
};

module.exports = {
  getImage,
};
