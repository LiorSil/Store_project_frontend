import React, { useState } from "react";
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

const FilterBarComp = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({
      category: event.target.value,
      price: maxPrice,
      text: searchText,
    });
  };

  const handleMaxPriceChange = (event, newValue) => {
    setMaxPrice(newValue);
    onFilterChange({
      category: selectedCategory,
      price: newValue,
      text: searchText,
    });
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    onFilterChange({
      category: selectedCategory,
      price: maxPrice,
      text: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(1000);
    setSearchText("");
    onFilterChange({ category: "All", price: 1000, text: "" });
  };

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
      <FormControl sx={{ minWidth: 180, margin: "0 100px" }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          label="Category"
        >
          <MenuItem value=""></MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
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
        <Typography gutterBottom>Max Price: {`${maxPrice}$`}</Typography>
        <Slider
          value={maxPrice}
          onChange={handleMaxPriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ width: "200%" }}
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        sx={{ minWidth: 200, margin: "0 100px" }}
      />
      <Button variant="outlined" onClick={handleClearFilters}>
        Clear
      </Button>
    </Box>
  );
};

export default FilterBarComp;
