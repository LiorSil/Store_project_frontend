import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  oldAccount: {
    firstName: "",
    lastName: "",
    password: "",
    username: "",
    allowOrders: false,
  },
  formData: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.oldAccount = action.payload;
    },
    updateAccount(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { setAccount, updateAccount } = accountSlice.actions;
export default accountSlice.reducer;
