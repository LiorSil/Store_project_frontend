import { createSlice } from "@reduxjs/toolkit";

const accountInitialState = {
  oldAccount: {},
  newAccount: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    setAccount: (state, action) => {
      state.oldAccount = action.payload;
    },
  },
});

export const { setAccount, getAccount } = accountSlice.actions;
export default accountSlice.reducer;
