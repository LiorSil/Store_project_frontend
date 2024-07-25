import React from "react";
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
  createTheme,
  useMediaQuery,
} from "@mui/material";
import LoadingComp from "../../../utils/shared/Loading";
import MaxPriceTypography from "./MaxPriceTypography";
import useFilterBar from "../../../hooks/user/products/useFilterBar"; // Adjust the path according to your project structure

const FilterBar = ({ categories, onFilterChange, error, loading }) => {
  const {
    selectedCategory,
    categoryOptions,
    maxPrice,
    searchText,
    handleCategoryChange,
    handleMaxPriceChange,
    handleSearchTextChange,
    handleClearFilters,
  } = useFilterBar(categories, onFilterChange);

  
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 750,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        padding: isSmallScreen ? 0.5 : 1,
        border: 2,
        backgroundColor: "#d0ddf7",
        borderRadius: 2,
        borderColor: "primary.main",
        boxShadow: 0,
        display: "flex",
        gap: isSmallScreen ? 1 : 2,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        margin: 2,
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <FormControl
        sx={{
          minWidth: isSmallScreen ? "100%" : 180,
        }}
      >
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
          width: isSmallScreen ? "100%" : 200,
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
          sx={{
            width: isSmallScreen ? "90%" : "100%",
          }}
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        sx={{
          minWidth: isSmallScreen ? "100%" : 200,
        }}
      />
      <Button
        variant="outlined"
        onClick={handleClearFilters}
        sx={{
          borderColor: "primary.main",
          color: "primary.main",
          fontWeight: "bold",
          padding: isSmallScreen ? "8px" : "8px 16px",
          borderRadius: "8px",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            borderColor: "primary.main",
          },
          width: isSmallScreen ? "100%" : "auto",
        }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default FilterBar;
