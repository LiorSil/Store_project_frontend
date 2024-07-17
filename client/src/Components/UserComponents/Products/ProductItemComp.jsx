import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Reducers/cartReducer";

const ProductItemComp = ({ product }) => {
  const dispatch = useDispatch();

  // Local state for managing quantity and alert visibility
  const [quantity, setQuantity] = useState(1);

  // Increment the quantity of the product
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement the quantity of the product
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Add the product to the cart with the specified quantity
  const handleAddToCart = () => {
    if (quantity <= product.quantity && product.quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
    } else {
      console.error("Invalid quantity or product out of stock");
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "primary.main",
        margin: 2,
      }}
    >
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
      <img
        src={product.imageUrl}
        alt={product.title}
        style={{
          display: "block",
          margin: "auto",
          height: 200,
          width: "auto",
        }}
      />
      <Box mt={2} display="flex" alignItems="center">
        <Button variant="outlined" onClick={handleDecrement}>
          -
        </Button>
        <Box mx={4}>
          <Typography variant="body2" style={{ fontSize: "1.5rem" }}>
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
          <IconButton
            disabled={quantity > product.quantity || product.quantity === 0}
            color="primary"
            size="large"
            aria-label="add to shopping cart"
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItemComp;
