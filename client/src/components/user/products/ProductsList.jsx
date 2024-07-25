import React from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItem";
import useProductsList from "../../../hooks/user/products/useProductsList"; // Adjust the path according to your project structure
import classes from "./ProductsList.module.css";

const ProductsList = ({ filters }) => {
  const products = useProductsList(filters);

  return (
    <Box
      className={classes["products-container"]}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      {products.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </Box>
  );
};

export default ProductsList;
