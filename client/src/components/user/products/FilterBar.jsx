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
import classes from "./FilterBar.module.css";

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
    <Box className={classes.filterBarContainer}>
      <FormControl className={classes.formControl}>
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
      <Box className={classes.maxPriceContainer}>
        <MaxPriceTypography maxPrice={maxPrice} />
        <Slider
          value={maxPrice}
          onChange={handleMaxPriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          className={classes.slider}
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        className={classes.searchField}
      />
      <Button
        variant="outlined"
        onClick={handleClearFilters}
        className={classes.clearButton}
      >
        Clear
      </Button>
    </Box>
  );
};

export default FilterBar;
