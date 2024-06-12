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
import { useDispatch } from "react-redux";
import {
  incrementCartItemCount,
  decrementCartItemCount,
} from "../../Redux/Reducers/cartReducer";

const CartItemComp = ({ cartItem, onIncrement, onDecrement }) => {
  const total = cartItem.price * cartItem.quantity;
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(incrementCartItemCount(item._id));
  };

  const handleDecrement = (item) => {
    dispatch(decrementCartItemCount(item._id));
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={cartItem.title} src={cartItem.imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={cartItem.title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Total: ${total}
            </Typography>
            <br />
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Quantity: {cartItem.quantity}
            </Typography>
          </React.Fragment>
        }
      />
      <Box ml="auto" display="flex" alignItems="center">
        <Button variant="outlined" onClick={() => handleDecrement(cartItem)}>
          -
        </Button>
        <Typography variant="body2" style={{ margin: "0 8px" }}>
          {cartItem.quantity}
        </Typography>
        <Button variant="outlined" onClick={() => handleIncrement(cartItem)}>
          +
        </Button>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CartItemComp;
