import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex !== -1) {
        // If the item with the same _id already exists, merge the quantities
        state.cart[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.cart.push(newItem);
      }
    },
    decrementCartItemCount: (state, action) => {
      state.cart = state.cart.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    incrementCartItemCount: (state, action) => {
      state.cart = state.cart.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    updateCartItemCount: (state, action) => {
      console.log("action.payload", action.payload);
      state.cart = state.cart.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

const totalPriceReducer = (state) => {
  return state.cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

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
