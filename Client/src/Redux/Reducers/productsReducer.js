import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";


// Async Thunk for Fetching Data
export const fetchProductsData = createAsyncThunk(
  "products/fetchData",
  async (_, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Updating Data
export const updateProductData = createAsyncThunk(
  "products/updateData",
  async (product, thunkAPI) => {
    console.log("product", product);
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
       

      if (!response.ok) {
        throw new Error("Failed to update product data");
      } else {
        return product;
      }
      
    



      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice for Products Data
const productsSlice = createSlice({
  name: "products",
  initialState: {
    productData: [],

    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.productData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = state.productData.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
