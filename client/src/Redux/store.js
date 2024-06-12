// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./Reducers/cartReducer";

const store = configureStore({
  reducer: cartReducer,
});

export default store;
