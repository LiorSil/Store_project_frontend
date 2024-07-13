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
import LoadingComp from "../Utils/LoadingComp";

const FilterBarComp = ({ categories, onFilterChange, error, loading }) => {
  const All = { _id: "All", name: "All" };
  const objectedCategories = [All, ...categories];

  const [selectedCategory, setSelectedCategory] = useState(All);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategoryObject = objectedCategories.find(
      (category) => category._id === selectedCategoryId
    );

    setSelectedCategory(selectedCategoryObject);

    onFilterChange({
      category: selectedCategoryObject,
      price: maxPrice,
      text: searchText,
    });
  };

  const handleMaxPriceChange = (event, newMaxPrice) => {
    setMaxPrice(newMaxPrice);
    onFilterChange({
      category: selectedCategory,
      price: newMaxPrice,
      text: searchText,
    });
  };

  const handleSearchTextChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
    onFilterChange({
      category: selectedCategory,
      price: maxPrice,
      text: newText,
    });
  };

  const handleClearFilters = () => {
    setSelectedCategory(All);
    setMaxPrice(1000);
    setSearchText("");
    onFilterChange({
      category: All,
      price: 1000,
      text: "",
    });
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
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory._id}
          onChange={handleCategoryChange}
          displayEmpty
          label="Category"
        >
          {objectedCategories.map((category) => (
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
        <Typography gutterBottom>Max Price: {`${maxPrice}$`}</Typography>
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
      <Button variant="outlined" onClick={handleClearFilters}>
        Clear
      </Button>
    </Box>
  );
};

export default FilterBarComp;
