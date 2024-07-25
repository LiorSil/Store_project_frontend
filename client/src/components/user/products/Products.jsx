import React from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Cart from "./Cart";
import ProductsList from "./ProductsList";
import FilterBar from "./FilterBar";
import { NoticeMessage } from "../../../utils/shared/commonComponents";
import useProducts from "../../../hooks/user/products/useProducts"; // Adjust the path according to your project structure

const Products = () => {
  const {
    categories,
    products,
    productsLoading,
    productsError,
    orderConfirmed,
    isCartOpen,
    filters,
    handleOrderConfirmed,
    toggleCart,
    handleFilterChange,
    setOrderConfirmed,
  } = useProducts();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: 1 }}>
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        products={products}
        onGetSuccessMessage={handleOrderConfirmed}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          <IconButton
            onClick={toggleCart}
            sx={{
              position: "fixed",
              top: isSmallScreen ? "25%" : 16,
              right: isSmallScreen ? 16 : 16,
              transform: isSmallScreen ? "translateY(-50%)" : "none",
              zIndex: 1000,
              backgroundColor: "white",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <FilterBar
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Box>
        {productsLoading ? (
          <Typography>Loading...</Typography>
        ) : productsError ? (
          <Typography color="error">
            Error loading products: {productsError.message}
          </Typography>
        ) : (
          <ProductsList filters={filters} />
        )}
      </Box>
      {orderConfirmed === "success" && (
        <NoticeMessage
          message="Order placed successfully"
          color="green"
          IconComp={CheckCircleIcon}
          onClose={() => {
            setOrderConfirmed("");
            window.location.reload();
          }}
        />
      )}
      {orderConfirmed === "error" && (
        <NoticeMessage
          message="Error placing order"
          color="red"
          IconComp={FeedbackIcon}
          onClose={() => setOrderConfirmed("")}
        />
      )}
    </Box>
  );
};

export default Products;
