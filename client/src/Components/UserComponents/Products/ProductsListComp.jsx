import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItemComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../../Redux/Reducers/productsReducer";
import classes from "./ProductsListComp.module.css";
import LoadingItemPlaceholderComp from "./LoadingItemPlaceholderComp";

const ProductsListComp = ({ filters, error, loading, products }) => {
  const dispatch = useDispatch();

  // Fetch products data on component mount
  useEffect(() => {
    dispatch(fetchProductsData()).catch((error) =>
      console.error("Error fetching products data:", error)
    );
  }, [dispatch]);

  // Filter products based on the provided filters
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

  // Display loading placeholders while products are being fetched
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

  // Display error message if there's an error fetching products
  if (error) {
    return (
      <Typography component="h6">Error loading products: {error}</Typography>
    );
  }

  // Display message if no products match the filters
  if (!filteredProducts.length) {
    return <Typography component="h6">No products found</Typography>;
  }

  // Render filtered products
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