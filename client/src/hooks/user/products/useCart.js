// src/hooks/useCart.js

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  totalPriceReducer,
  clearCart,
  updateCartItemCount,
} from "../../../redux/reducers/cart"; // Adjust the path according to your project structure
import useFetch from "../../useFetch"; // Adjust the path according to your project structure
import Cookies from "universal-cookie";
import API_BASE_URL from "../../../constants/serverUrl"; // Adjust the path according to your project structure

const useCart = (products, toggleCart, onGetSuccessMessage) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const totalPrice = useSelector(totalPriceReducer);
  const { fetchData, loading } = useFetch();

  // Local state for managing alerts and confirmation dialog
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [showQuantityAlert, setShowQuantityAlert] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => {
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
  }, [cart, dispatch, products, totalPrice]);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const closeAlert = useCallback(() => {
    setShowEmptyCartAlert(false);
    setShowQuantityAlert(false);
  }, []);

  const confirmOrder = useCallback(async () => {
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
  }, [
    cart,
    closeDialog,
    dispatch,
    fetchData,
    onGetSuccessMessage,
    toggleCart,
    totalPrice,
  ]);

  return {
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
  };
};

export default useCart;
