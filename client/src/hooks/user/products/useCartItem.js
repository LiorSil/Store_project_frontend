// src/hooks/useCartItem.js

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  incrementCartItemCount,
  decrementCartItemCount,
  removeCartItem,
} from "../../../redux/reducers/cart"; // Adjust the path according to your project structure

const useCartItem = (cartItem, catalogProduct) => {
  const dispatch = useDispatch();
  const total = cartItem.price * cartItem.quantity;

  const handleIncrement = useCallback(() => {
    dispatch(incrementCartItemCount(cartItem._id));
  }, [dispatch, cartItem._id]);

  const handleDecrement = useCallback(() => {
    if (cartItem.quantity > 1) {
      dispatch(decrementCartItemCount(cartItem._id));
    }
  }, [dispatch, cartItem._id, cartItem.quantity]);

  const handleRemove = useCallback(() => {
    dispatch(removeCartItem(cartItem._id));
  }, [dispatch, cartItem._id]);

  return {
    total,
    handleIncrement,
    handleDecrement,
    handleRemove,
  };
};

export default useCartItem;
