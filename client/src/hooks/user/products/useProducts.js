// src/hooks/useProducts.js

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../../redux/reducers/categories";

const useProducts = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const {
    productsData: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const [orderConfirmed, setOrderConfirmed] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: { _id: "All", name: "All" },
    price: 1000,
    text: "",
  });

  useEffect(() => {
    dispatch(fetchCategoriesData()).catch((error) =>
      console.error("Error fetching categories data:", error)
    );
  }, [dispatch]);

  const handleOrderConfirmed = useCallback((message) => {
    setOrderConfirmed(message);
  }, []);

  const toggleCart = useCallback(() => {
    setCartOpen((prevState) => !prevState);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  return {
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
  };
};

export default useProducts;
