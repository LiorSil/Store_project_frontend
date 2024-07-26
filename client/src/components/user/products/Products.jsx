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
import styles from "./Products.module.css";

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
    <Box className={styles.productsContainer}>
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        products={products}
        onGetSuccessMessage={handleOrderConfirmed}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box className={styles.filterBarContainer}>
          <IconButton
            onClick={toggleCart}
            className={`${styles.cartButton} ${
              isSmallScreen ? styles.cartButtonSmallScreen : ""
            }`}
          >
            <ShoppingCartIcon />
          </IconButton>
          <FilterBar
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Box>
        {productsLoading ? (
          <Typography className={styles.loadingText}>Loading...</Typography>
        ) : productsError ? (
          <Typography className={styles.errorText}>
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
