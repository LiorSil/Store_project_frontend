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
} from "../../Redux/Reducers/cartReducer";
import { ConfirmComp, LoadingComp } from "../Utils/indexUtil";
import CartItemComp from "./CartItemComp";
import useFetch from "../../Hooks/useFetch";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

const CartComp = ({ isOpen, toggleCart, onGetSuccessMessage, products }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showQuantityAlert, setShowQuantityAlert] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = useSelector(totalPriceReducer);
  const dispatch = useDispatch();
  const { fetchData, loading, error } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    if (!!totalPrice === false) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);

      //validate that the each cart item quantity is less than the product max quantity and if not, show an alert message
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
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseAlert = () => {
    setShowAlert(false);
    setShowQuantityAlert(false);
  };
  const handleConfirmOrder = async () => {
    //validate that the each cart item quantity is less than the product max quantity and if not, show an alert message

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          orderDate: new Date().toLocaleString("he-Il", {
            timeZone: "Asia/Jerusalem",
          }),
          imageUrl: item.imageUrl,
        })),
        totalAmount: totalPrice, // Include totalAmount in orderData
        orderDate: new Date().toISOString(), // Use ISO string for date
      };

      const cookies = new Cookies();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
        body: JSON.stringify(orderData),
      };

      // Perform the POST request using fetchData from useFetch hook
      const success = await fetchData(`${API_BASE_URL}/orders`, options);

      // Clear the cart after successful order creation
      dispatch(clearCart());
      handleCloseDialog();
      toggleCart();
      if (success) {
        onGetSuccessMessage("success");
      } else {
        onGetSuccessMessage("error");
      }
    } catch (error) {
      console.error("Error placing order: ", error.message);
      onGetSuccessMessage("error");
    }
  };

  if (loading) return <LoadingComp />; // Show loading indicator if fetching data

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message if fetch fails
  }

  return (
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Cart is empty
            </Box>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ marginBottom: 2 }}
        >
          Place Order
        </Button>
        {showAlert && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please add items to cart before placing order
          </Alert>
        )}
        {showQuantityAlert && (
          <Alert severity="info">
            <AlertTitle>info</AlertTitle>
            Quantity exceeds available stock - Quantity has been adjusted to the
            maximum available stock
            <Button
              onClick={handleCloseAlert}
              color="inherit"
              size="small"
              style={{ marginLeft: "auto" }}
            >
              Close
            </Button>
          </Alert>
        )}
        <ConfirmComp
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmOrder}
          title="Confirm Order"
          description="Are you sure you want to place this order?"
        />
      </Box>
    </Drawer>
  );
};

export default CartComp;
