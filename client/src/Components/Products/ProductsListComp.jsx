import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItemComp";
import useFetch from "../../Hooks/useFetch";
import { LoadingComp } from "../Utils/indexUtil";
import classes from "./ProductsListComp.module.css";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

const ProductsListComp = ({ filters }) => {
  const cookies = useMemo(() => new Cookies(), []);
  const { data: products, loading, error, fetchData } = useFetch();
  console.log("ProductsListComp -> products", products); // Debugging log

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        };
        await fetchData(`${API_BASE_URL}/products`, options);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [filters.category, filters.price, filters.text, fetchData, cookies]);

  if (loading) {
    return <LoadingComp />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  // Handle case where products is still null after fetching
  if (!products) {
    return <Typography component="h6">No products found</Typography>;
  }

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.category._id === "All" ||
      product.category === filters.category._id;

    const priceMatch = product.price <= filters.price;

    const textMatch =
      filters.text === "" ||
      product.title.toLowerCase().includes(filters.text.toLowerCase());

    return categoryMatch && priceMatch && textMatch;
  });

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
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <Typography component="h6">No products found</Typography>
      )}
    </Box>
  );
};

export default ProductsListComp;
