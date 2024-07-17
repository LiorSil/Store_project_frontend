import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
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
