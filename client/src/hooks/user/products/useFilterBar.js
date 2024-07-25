// src/hooks/useFilterBar.js

import { useState, useMemo, useCallback } from "react";

const useFilterBar = (categories, onFilterChange) => {
  // Default category to include "All"
  const defaultCategory = useMemo(() => ({ _id: "All", name: "All" }), []);
  const categoryOptions = useMemo(
    () => [defaultCategory, ...categories],
    [categories, defaultCategory]
  );

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = useCallback(
    (event) => {
      const selectedCategoryId = event.target.value;
      const selectedCategoryObject = categoryOptions.find(
        (category) => category._id === selectedCategoryId
      );

      setSelectedCategory(selectedCategoryObject);

      onFilterChange({
        category: selectedCategoryObject,
        price: maxPrice,
        text: searchText,
      });
    },
    [categoryOptions, maxPrice, onFilterChange, searchText]
  );

  const handleMaxPriceChange = useCallback(
    (event, newMaxPrice) => {
      setMaxPrice(newMaxPrice);
      onFilterChange({
        category: selectedCategory,
        price: newMaxPrice,
        text: searchText,
      });
    },
    [onFilterChange, searchText, selectedCategory]
  );

  const handleSearchTextChange = useCallback(
    (event) => {
      const newText = event.target.value;
      setSearchText(newText);
      onFilterChange({
        category: selectedCategory,
        price: maxPrice,
        text: newText,
      });
    },
    [maxPrice, onFilterChange, selectedCategory]
  );

  const handleClearFilters = useCallback(() => {
    setSelectedCategory(defaultCategory);
    setMaxPrice(1000);
    setSearchText("");
    onFilterChange({
      category: defaultCategory,
      price: 1000,
      text: "",
    });
  }, [defaultCategory, onFilterChange]);

  return {
    selectedCategory,
    categoryOptions,
    maxPrice,
    searchText,
    handleCategoryChange,
    handleMaxPriceChange,
    handleSearchTextChange,
    handleClearFilters,
  };
};

export default useFilterBar;
