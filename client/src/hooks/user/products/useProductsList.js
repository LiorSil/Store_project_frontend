// src/hooks/useProductsList.js

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../../redux/reducers/products"; // Adjust the path according to your project structure

const useProductsList = (filters) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsData); // Ensure this matches your Redux state structure

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsData()).catch((error) =>
        console.error("Error fetching products data:", error)
      );
    }
  }, [dispatch, products.length]);

  return useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !filters.category._id ||
        filters.category._id === "All" ||
        product.category === filters.category._id;
      const matchesPrice = product.price <= filters.price;
      const matchesText = (product.title || "")
        .toLowerCase()
        .includes((filters.text || "").toLowerCase());

      return matchesCategory && matchesPrice && matchesText;
    });
  }, [products, filters]);
};

export default useProductsList;
