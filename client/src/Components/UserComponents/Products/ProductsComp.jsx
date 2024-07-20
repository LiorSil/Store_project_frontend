import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CartComp from "./CartComp";
import ProductsListComp from "./ProductsListComp";
import FilterBarComp from "./FilterBarComp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { NoticeMessageComp } from "../../Utils/indexUtil";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesData } from "../../../Redux/Reducers/categoriesReducer";

const ProductsComp = () => {
  const dispatch = useDispatch();
  // Memoized selector to avoid unnecessary re-renders
  const categories = useSelector(
    useMemo(() => (state) => state.categories.data, [])
  );

  const {
    productsData: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  // Local state for order confirmation message, cart visibility, and filters
  const [orderConfirmed, setOrderConfirmed] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: { _id: "All", name: "All" },
    price: 1000,
    text: "",
  });

  // Fetch categories data on component mount
  useEffect(() => {
    dispatch(fetchCategoriesData()).catch((error) =>
      console.error("Error fetching categories data:", error)
    );
  }, [dispatch]);

  // Handler for order confirmation
  const handleOrderConfirmed = useCallback((message) => {
    setOrderConfirmed(message);
  }, []);

  // Toggle cart visibility
  const toggleCart = useCallback(() => {
    setCartOpen((prevState) => !prevState);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjusted to "md" (less than 850px)

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
        products={products}
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
            position: "relative",
          }}
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
                "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)", // More pronounced shadow
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25)", // Shadow effect on hover
              },
            }}
          >
            <ShoppingCartIcon />
          </IconButton>

          <FilterBarComp
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <ProductsListComp
          filters={filters}
          categories={categories}
          error={productsError}
          loading={productsLoading}
          products={products}
        />
      </Box>
      {orderConfirmed === "success" && (
        <NoticeMessageComp
          message="Order placed successfully"
          color="green"
          IconComp={CheckCircleIcon}
          onClose={() => {
            setOrderConfirmed("");
            // Refresh the page to update the quantity of products
            window.location.reload();
          }}
        />
      )}
      {orderConfirmed === "error" && (
        <NoticeMessageComp
          message="Error placing order"
          color="red"
          IconComp={FeedbackIcon}
          onClose={() => setOrderConfirmed("")}
        />
      )}
    </Box>
  );
};

export default ProductsComp;
