import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

// Async Thunk for Adding Data

export const addProductData = createAsyncThunk(
  "products/addData",
  async (product, thunkAPI) => {
    try {
      console.log("product", product); // Debugging
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice for Add Product

const addProductReducer = createSlice({
  name: "addProduct",
  initialState: {
    newProduct: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.newProduct = action.payload;
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addProductReducer.reducer;
