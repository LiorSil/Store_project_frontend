// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartSlice from "./Reducers/cartReducer";
import accountSlice from "./Reducers/accountReducer";
import usersSlice from "./Reducers/userReducer";
import categoriesSlice from "./Reducers/categoriesReducer";
import productsSlice from "./Reducers/productsReducer";
import ordersSlice from "./Reducers/ordersReducer";
import addProductSlice from "./Reducers//addProductReducer";

const rootReducer = combineReducers({
  cart: cartSlice,
  account: accountSlice,
  users: usersSlice,
  categories: categoriesSlice,
  products: productsSlice,
  orders: ordersSlice,
  addProduct: addProductSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
