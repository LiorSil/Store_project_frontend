import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProductsListComp = () => {
  const storage = getStorage();
  const imagesRef = ref(storage, "images/black_shoes.png");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getDownloadURL(imagesRef)
      .then((url) => setImageUrl(url))
      .catch((error) => console.log(error));
  }, [imagesRef]);

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "primary.main",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt="Black Shoes"
          sx={{ width: 200, height: 200 }}
        />
      )}
      {/* List of products goes here */}
    </Box>
  );
};

export default ProductsListComp;
