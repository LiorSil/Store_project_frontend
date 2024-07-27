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
import classes from "./Products.module.css";

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
    <Box className={classes.productsContainer}>
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        products={products}
        onGetSuccessMessage={handleOrderConfirmed}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box className={classes.filterBarContainer}>
          <IconButton
            onClick={toggleCart}
            className={`${classes.cartButton} ${
              isSmallScreen ? classes.cartButtonSmallScreen : ""
            }`}
          >
            <ShoppingCartIcon />
          </IconButton>
          <FilterBar
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <ProductsList
          filters={filters}
          loading={productsLoading}
          error={productsError}
        />
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
