import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CartComp from "./CartComp";
import ProductsListComp from "./ProductsListComp";
import FilterBarComp from "./FilterBarComp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NoticeMessageComp } from "../Utils/indexUtil";

const ProductsComp = () => {
  const categories = ["All", "Clothing", "Jewelry", "Sports", "Electronics"];
  const [orderConfirmed, setOrderConfirmed] = useState(""); // Add state for order confirmation [1
  const [isCartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    price: 1000,
    text: "",
  });

  const handleOrderConfirmed = (message) => {
    setOrderConfirmed(message);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Handle filter logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        padding: 1,
      }}
    >
      <CartComp
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        onGetSuccessMessage={handleOrderConfirmed}
      />
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
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <ProductsListComp filters={filters} />
      </Box>
      {orderConfirmed === "success" && (
        <NoticeMessageComp
          message="Order placed successfully"
          IconComp={CheckCircleIcon}
          onClose={() => setOrderConfirmed("")}
        />
      )}
    </Box>
  );
};

export default ProductsComp;
