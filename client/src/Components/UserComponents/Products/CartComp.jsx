import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  totalPriceReducer,
  clearCart,
  updateCartItemCount,
} from "../../../Redux/Reducers/cartReducer";
import { ConfirmComp, LoadingComp } from "../../Utils/indexUtil";
import CartItemComp from "./CartItemComp";
import useFetch from "../../../Hooks/useFetch";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../../Constants/serverUrl";
import EmptyCartMessage from "./EmptyCartMessage";
import TotalComp from "./TotalComp";

const CartComp = ({ isOpen, toggleCart, onGetSuccessMessage, products }) => {
  const dispatch = useDispatch();

  // Local state for managing alerts and confirmation dialog
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [showQuantityAlert, setShowQuantityAlert] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const totalPrice = useSelector(totalPriceReducer);

  const { fetchData, loading, error } = useFetch();

  // Open the confirmation dialog
  const openDialog = () => {
    if (totalPrice === 0) {
      setShowEmptyCartAlert(true);
      return;
    }

    setShowEmptyCartAlert(false);

    for (let i = 0; i < cart.length; i++) {
      const product = products.find((prod) => prod._id === cart[i]._id);
      if (cart[i].quantity > product.quantity) {
        setShowQuantityAlert(true);
        dispatch(
          updateCartItemCount({
            _id: product._id,
            quantity: product.quantity,
          })
        );
        return;
      }
    }

    setIsDialogOpen(true);
  };

  // Close the confirmation dialog
  const closeDialog = () => setIsDialogOpen(false);

  // Close the alerts
  const closeAlert = () => {
    setShowEmptyCartAlert(false);
    setShowQuantityAlert(false);
  };

  // Handle order confirmation
  const confirmOrder = async () => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          orderDate: new Date().toISOString(),
          imageUrl: item.imageUrl,
        })),
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
      };

      const cookies = new Cookies();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify(orderData),
      };

      const success = await fetchData(`${API_BASE_URL}/orders`, options);

      if (success) {
        dispatch(clearCart());
        toggleCart();
        onGetSuccessMessage("success");
      } else {
        onGetSuccessMessage("error");
      }

      closeDialog();
    } catch (error) {
      console.error("Error placing order: ", error.message);
      onGetSuccessMessage("error");
    }
  };

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
          <LoadingComp />
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
                <CartItemComp
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
          <ConfirmComp
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

export default CartComp;
