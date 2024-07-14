import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItemComp";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../../../Redux/Reducers/productsReducer";
import classes from "./ProductsListComp.module.css";
import LoadingItemPlaceholderComp from "./LoadingItemPlaceholderComp";

const ProductsListComp = ({ filters, error, loading, products }) => {
  console.log("products", products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const categoryMatch =
        filters.category._id === "All" ||
        product.category === filters.category._id;

      const priceMatch = product.price <= filters.price;

      const textMatch =
        filters.text === "" ||
        product.title.toLowerCase().includes(filters.text.toLowerCase());

      return categoryMatch && priceMatch && textMatch;
    });
  }, [products, filters]);

  if (loading) {
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
        {[...Array(10)].map((_, index) => (
          <LoadingItemPlaceholderComp key={index} />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Typography component="h6">Error loading products: {error}</Typography>
    );
  }

  if (!filteredProducts.length) {
    return <Typography component="h6">No products found</Typography>;
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
      {filteredProducts.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </Box>
  );
};

export default ProductsListComp;
