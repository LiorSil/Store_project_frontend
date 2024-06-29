import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

// Async Thunk for Fetching Data
export const fetchCategoriesData = createAsyncThunk(
  "getCategories/fetchData",
  async (_, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const response = await fetch(`${API_BASE_URL}/products/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories data"); // Explicitly throw an error
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Pass error message to reducer
    }
  }
);

// Data Slice
const categoriesReducer = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No additional reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default categoriesReducer.reducer;
