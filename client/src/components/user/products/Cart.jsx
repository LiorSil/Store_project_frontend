import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "./CartItem";
import EmptyCartMessage from "./EmptyCartMessage";
import TotalComp from "./Total";
import { Confirm, Loading } from "../../../utils/shared/commonComponents";
import useCart from "../../../hooks/user/products/useCart"; // Adjust the path according to your project structure

const Cart = ({ isOpen, toggleCart, onGetSuccessMessage, products }) => {
  const {
    cart,
    totalPrice,
    loading,
    showEmptyCartAlert,
    showQuantityAlert,
    isDialogOpen,
    openDialog,
    closeDialog,
    closeAlert,
    confirmOrder,
  } = useCart(products, toggleCart, onGetSuccessMessage);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Loading />
        </Box>
      )}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleCart}
        sx={{ position: "fixed", top: 0, zIndex: 1000, height: "100vh" }}
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
              cart.map((item) => (
                <CartItem
                  key={item._id}
                  cartItem={item}
                  catalogProduct={products.find(
                    (product) => product._id === item._id
                  )}
                />
              ))
            ) : (
              <EmptyCartMessage />
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
            <TotalComp total={totalPrice} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={openDialog}
            sx={{ marginBottom: 2 }}
          >
            Place Order
          </Button>
          {showEmptyCartAlert && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Please add items to the cart before placing an order.
            </Alert>
          )}
          {showQuantityAlert && (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Quantity exceeds available stock. Quantity has been adjusted to
              the maximum available stock.
              <Button
                onClick={closeAlert}
                color="inherit"
                size="small"
                style={{ marginLeft: "auto" }}
              >
                Close
              </Button>
            </Alert>
          )}
          <Confirm
            open={isDialogOpen}
            onClose={closeDialog}
            onConfirm={confirmOrder}
            title="Confirm Order"
            description="Are you sure you want to place this order?"
          />
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
