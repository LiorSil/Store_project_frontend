import { createSlice } from "@reduxjs/toolkit";

const accountInitialState = {
  oldAccount: {},
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
