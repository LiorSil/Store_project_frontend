import React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import CartItemComp from "./CartItemComp";
import { totalPriceReducer } from "../../Redux/Reducers/cartReducer";

const CartComp = ({ isOpen, toggleCart }) => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(totalPriceReducer);
  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleCart}
      sx={{ position: "fixed", top: 0, zIndex: 9999, height: "100vh" }}
    >
      <Box
        sx={{
          width: 300,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        role="presentation"
      >
        <Box>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
          {cart.length > 0 ? (
            cart.map((item) => <CartItemComp key={item._id} cartItem={item} />)
          ) : (
            <Box>No items in cart</Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Total: ${totalPrice}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartComp;
