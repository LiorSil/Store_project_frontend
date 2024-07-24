import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../constants/serverUrl";

// Initial state for user-related data
const userInitialState = {
  customers: [],
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching users and products data
export const fetchUsersAndProductsData = createAsyncThunk(
  "users/fetchData",
  async (_, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/users/customersAndProducts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetail = await response.json();
        throw new Error(errorDetail.message || "Failed to fetch users data");
      }

      const data = await response.json();
      const { users, products } = data;

      return { users, products };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice for users data
const usersSlice = createSlice({
  name: "users",
  initialState: userInitialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAndProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAndProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.users;
        state.products = action.payload.products;
      })
      .addCase(fetchUsersAndProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { setIsAdmin } = usersSlice.actions;
export default usersSlice.reducer;
