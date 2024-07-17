import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import LoadingComp from "../../Utils/LoadingComp";
import MaxPriceTypography from "./MaxPriceTypography";

const FilterBarComp = ({ categories, onFilterChange, error, loading }) => {
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

  // Handle category change
  const handleCategoryChange = (event) => {
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
  };

  // Handle max price change
  const handleMaxPriceChange = (event, newMaxPrice) => {
    setMaxPrice(newMaxPrice);
    onFilterChange({
      category: selectedCategory,
      price: newMaxPrice,
      text: searchText,
    });
  };

  // Handle search text change
  const handleSearchTextChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
    onFilterChange({
      category: selectedCategory,
      price: maxPrice,
      text: newText,
    });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory(defaultCategory);
    setMaxPrice(1000);
    setSearchText("");
    onFilterChange({
      category: defaultCategory,
      price: 1000,
      text: "",
    });
  };

  // Show loading component if loading state is true
  if (loading) {
    return <LoadingComp />;
  }

  // Show error message if error state is true
  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error loading filters: {error.message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 1,
        border: 2,
        backgroundColor: "#d0ddf7",
        borderRadius: 2,
        borderColor: "primary.main",
        boxShadow: 0,
        display: "flex",
        gap: 2,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        margin: 2,
      }}
    >
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory._id}
          onChange={handleCategoryChange}
          displayEmpty
          label="Category"
        >
          {categoryOptions.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          width: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MaxPriceTypography maxPrice={maxPrice} />
        <Slider
          value={maxPrice}
          onChange={handleMaxPriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ width: "100%" }}
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        sx={{ minWidth: 200 }}
      />
      <Button
        variant="outlined"
        onClick={handleClearFilters}
        sx={{
          borderColor: "primary.main",
          color: "primary.main",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            borderColor: "primary.main",
          },
        }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default FilterBarComp;
