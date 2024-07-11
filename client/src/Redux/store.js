// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./Reducers/cartReducer";
import accountReducer from "./Reducers/accountReducer";
import userReducer from "./Reducers/userReducer";
import categoriesReducer from "./Reducers/categoriesReducer";
import productsReducer from "./Reducers/productsReducer";
import ordersReducer from "./Reducers/ordersReducer";
import addProductReducer from "./Reducers/addProductReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  account: accountReducer,
  users: userReducer,
  categories: categoriesReducer,
  products: productsReducer,
  orders: ordersReducer,
  addProduct: addProductReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
