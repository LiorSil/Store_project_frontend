// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./Reducers/cartReducer";
import accountReducer from "./Reducers/accountReducer";
import userReducer from "./Reducers/userReducer";
import categoriesReducer from "./Reducers/categoriesReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  account: accountReducer,
  user: userReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
