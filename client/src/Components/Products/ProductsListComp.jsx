import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProductItem from "./ProductItemComp";
import useFetch from "../../Hooks/useFetch";
import { LoadingComp } from "../Utils/indexUtil";
import classes from "./ProductsListComp.module.css";

const ProductsListComp = ({ filters }) => {
  const { data: products, loading, error, fetchData } = useFetch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        await fetchData("http://localhost:5000/products", options);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [filters.category, filters.price, filters.text, fetchData]);

  if (loading) {
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
      {products && products.length > 0 ? (
        products
          .filter((product) => {
            const categoryMatch =
              ["all"].includes(filters.category.toLowerCase()) ||
              product.category === filters.category.toLowerCase();

            const priceMatch = product.price <= filters.price;

            const textMatch =
              filters.text === "" ||
              product.title.toLowerCase().includes(filters.text.toLowerCase());

            return categoryMatch && priceMatch && textMatch;
          })
          .map((product) => <ProductItem key={product._id} product={product} />)
      ) : (
        <Typography variant="h6">No products found</Typography>
      )}
    </Box>
  );
};

export default ProductsListComp;
