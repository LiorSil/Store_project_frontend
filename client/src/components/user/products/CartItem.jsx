import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useCartItem from "../../../hooks/user/products/useCartItem"; // Adjust the path according to your project structure

const CartItem = ({ cartItem, catalogProduct }) => {
  const { total, handleIncrement, handleDecrement, handleRemove } = useCartItem(
    cartItem,
    catalogProduct
  );

  return (
    <ListItem
      sx={{
        borderBottom: "1px solid lightgray",
        padding: "8px 0",
        display: "flex",
        justifyContent: "space-between",
      }}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar
          alt={cartItem.title}
          src={cartItem.imageUrl}
          sx={{ width: 100, height: 100, borderRadius: 2 }}
        />
      </ListItemAvatar>

      <ListItemText
        sx={{
          border: 1,
          borderStyle: "solid",
          borderColor: "primary.main",
          borderRadius: 2,
          padding: "8px",
        }}
        primary={cartItem.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              Total: ${total.toFixed(2)}
            </Typography>
            <br />
            <Typography
              sx={{ display: "inline" }}
              component="span"
              color="text.primary"
            >
              Quantity: {cartItem.quantity}
            </Typography>
            <Box mt={2} display="flex" alignItems="center" component="span">
              <Button
                variant="outlined"
                disabled={cartItem.quantity === 1}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Typography
                component="span"
                variant="body2"
                style={{ margin: "0 8px" }}
              >
                {cartItem.quantity}
              </Typography>
              <Button
                variant="outlined"
                disabled={cartItem.quantity >= catalogProduct.quantity}
                onClick={handleIncrement}
              >
                +
              </Button>
              <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        }
      />
    </ListItem>
  );
};

export default CartItem;
