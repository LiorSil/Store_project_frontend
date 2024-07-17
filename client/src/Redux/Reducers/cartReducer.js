import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If the item with the same _id already exists, merge the quantities
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.cart.push(newItem);
      }
    },
    decrementCartItemCount(state, action) {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity -= 1;
      }
    },
    incrementCartItemCount(state, action) {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    updateCartItemCount(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

/**
 * Calculates the total price of items in the cart.
 *
 * @param {Object} state - The Redux state.
 * @returns {number} - The total price of items in the cart.
 */
const totalPriceReducer = (state) =>
  state.cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const {
  addToCart,
  decrementCartItemCount,
  incrementCartItemCount,
  updateCartItemCount,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export { totalPriceReducer };

export default cartSlice.reducer;
