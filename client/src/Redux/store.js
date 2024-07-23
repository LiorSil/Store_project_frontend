// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartSlice from "./reducers/cart";
import accountSlice from "./reducers/account";
import usersSlice from "./reducers/user";
import categoriesSlice from "./reducers/categories";
import productsSlice from "./reducers/products";
import ordersSlice from "./reducers/orders";
import addProductSlice from "./reducers/addProduct";

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
