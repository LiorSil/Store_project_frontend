import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ProductItemComp = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
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
      <Typography variant="h6" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {product.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Category: {product.category}
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
        <Button variant="outlined" onClick={handleIncrement}>
          +
        </Button>

        <Box alignContent="flex-end" ml="auto">
          <IconButton
            color="primary"
            size="large"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItemComp;
