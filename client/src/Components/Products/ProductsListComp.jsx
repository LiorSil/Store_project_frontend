import React from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItemComp";
import useFetch from "../../Hooks/useFetch";
import { LoadingComp } from "../Utils/LoadingComp";
import classes from "./ProductsListComp.module.css";

const ProductsListComp = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useFetch("http://localhost:5000/products");

  if (isLoading) {
    return <LoadingComp />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      {products ? (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <Typography variant="h6">No products found </Typography>
      )}
    </Box>
  );
};

export default ProductsListComp;
