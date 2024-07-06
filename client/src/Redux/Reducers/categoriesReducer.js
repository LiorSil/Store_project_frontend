import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import API_BASE_URL from "../../Constants/serverUrl";

// Async Thunk for Fetching Data
export const fetchCategoriesData = createAsyncThunk(
  "categories/fetchData",
  async (_, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Updating Category Data
export const fetchConfirmChanges = createAsyncThunk(
  "categories/confirmChange",
  async (categories, thunkAPI) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categories),
      });

      if (!response.ok) {
        throw new Error("Failed to update categories data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
  reducers: {
    updateCategories: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        //data is array of objects [{_id: 1, name: "category1"}, {_id: 2, name: "category2"}]
        state.data = action.payload;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchConfirmChanges.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchConfirmChanges.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConfirmChanges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions
export const { updateCategories } = categoriesReducer.actions;

export default categoriesReducer.reducer;
