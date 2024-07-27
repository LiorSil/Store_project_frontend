import React from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItem";
import useProductsList from "../../../hooks/user/products/useProductsList"; // Adjust the path according to your project structure
import classes from "./ProductsList.module.css";
import LoadingItemPlaceholder from "./LoadingItemPlaceholder";
import Loading from "../../../utils/shared/Loading";

const ProductsList = ({ filters, loading, error }) => {
  const products = useProductsList(filters);

  if (loading) {
    return (
      <Box
        className={classes["products-container"]}
        sx={{
          marginInline: "3rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <LoadingItemPlaceholder key={index} />
        ))}
      </Box>
    );
  }

  return (
    <Box
      className={classes["products-container"]}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {products.length === 0 ? (
        <Loading />
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </Box>
  );
};

export default ProductsList;
