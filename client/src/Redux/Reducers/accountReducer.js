import { createSlice } from "@reduxjs/toolkit";

const accountInitialState = {
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
  initialState: accountInitialState,
  reducers: {
    setAccount: (state, action) => {
      state.oldAccount = action.payload;
    },
    updateAccount: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setAccount, updateAccount } = accountSlice.actions;
export default accountSlice.reducer;
