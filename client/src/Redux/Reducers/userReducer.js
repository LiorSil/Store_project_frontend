import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

const userInitialState = {
  isAdmin: true,
  customers: [],
};

export const fetchUsersData = createAsyncThunk(
  "users/fetchData",
  async (_, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/users/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users data");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersReducer = createSlice({
  name: "users",
  initialState: userInitialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsAdmin } = usersReducer.actions;
export default usersReducer.reducer;
