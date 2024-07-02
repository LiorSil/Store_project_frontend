import React, { useMemo, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CartComp from "./CartComp";
import ProductsListComp from "./ProductsListComp";
import FilterBarComp from "./FilterBarComp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { NoticeMessageComp } from "../Utils/indexUtil";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";

const ProductsComp = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector(useMemo(() => (state) => state.categories, []));

  const [orderConfirmed, setOrderConfirmed] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: { _id: "All", name: "All" },

    price: 1000,
    text: "",
  });

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const handleOrderConfirmed = (message) => {
    setOrderConfirmed(message);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
          color="green"
          IconComp={CheckCircleIcon}
          onClose={() => setOrderConfirmed("")}
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
