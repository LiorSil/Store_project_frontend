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
  removeCartItem,
} from "../../Redux/Reducers/cartReducer";
import { yellow } from "@mui/material/colors";

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
              Total: ${total}
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
                variant={cartItem.quantity === 1 ? "contained" : "outlined"}
                disabled={cartItem.quantity === 1}
                onClick={() => {
                  handleDecrement(cartItem);
                }}
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
                onClick={() => handleIncrement(cartItem)}
              >
                +
              </Button>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => dispatch(removeCartItem(cartItem._id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        }
      />
    </ListItem>
  );
};

export default CartItemComp;
