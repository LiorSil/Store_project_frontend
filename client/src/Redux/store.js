// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./Reducers/cartReducer";
import accountReducer from "./Reducers/accountReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  account: accountReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
