import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useProductItem from "../../../hooks/user/products/useProductItem"; // Adjust the path according to your project structure
import classes from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const {
    quantity,
    showMessage,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
  } = useProductItem(product);

  return (
    <Box className={classes.container}>
      <Typography component="h6" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {product.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Category: {product.categoryName}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Price: ${product.price}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Quantity Left: {product.quantity}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Bought: {product.bought}
      </Typography>
      <Box
        component="img"
        src={product.imageUrl}
        alt={product.title}
        className={classes.image}
      />
      <Box mt={2} display="flex" alignItems="center">
        <Button variant="outlined" onClick={handleDecrement}>
          -
        </Button>
        <Box mx={4}>
          <Typography variant="body2" className={classes.quantityText}>
            {quantity}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleIncrement}
          disabled={quantity >= product.quantity}
        >
          +
        </Button>
        <Box ml="auto">
          <Button
            endIcon={<AddShoppingCartIcon />}
            disabled={quantity > product.quantity || product.quantity === 0}
            color="primary"
            size="large"
            aria-label="add to shopping cart"
            onClick={handleAddToCart}
          >
            Add
          </Button>
        </Box>
      </Box>
      {showMessage && (
        <Box className={`${classes.message} ${classes.animateMessage}`}>
          Product added to cart
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ProductItem);
