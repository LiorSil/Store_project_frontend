import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  isAdmin: true,
};

const accountSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = accountSlice.actions;
export default accountSlice.reducer;
