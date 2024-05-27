import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CartComp from "./CartComp";
import ProductsListComp from "./ProductsListComp";
import FilterBarComp from "./FilterBarComp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductsComp = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    price: 100,
    text: "",
  });

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Handle filter logic here
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: 1 }}>
      <CartComp isOpen={isCartOpen} toggleCart={toggleCart} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleCart}>
            <ShoppingCartIcon />
          </IconButton>
          <FilterBarComp
            categories={["Electronics", "Books", "Clothing"]}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <ProductsListComp filters={filters} />
      </Box>
    </Box>
  );
};

export default ProductsComp;
