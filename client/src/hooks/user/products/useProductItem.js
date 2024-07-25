// src/hooks/useProductItem.js

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reducers/cart"; // Adjust the path according to your project structure

const useProductItem = (product) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const handleIncrement = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (quantity <= product.quantity && product.quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
      triggerMessage();
    } else {
      console.error("Invalid quantity or product out of stock");
    }
  }, [dispatch, product, quantity]);

  const triggerMessage = useCallback(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }, []);

  return {
    quantity,
    showMessage,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
  };
};

export default useProductItem;
