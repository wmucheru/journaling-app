import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAPI } from "@/utils/api";

import * as types from "@/redux/actions/actionTypes";
import type { RootState } from "@/redux/store";

const initialState = {
  categories: [],
  category: {},
  categoryStatus: {
    message: "",
    error: false,
    loading: false,
    saving: false,
  },
};

export const fetchCategories = createAsyncThunk(
  types.FETCH_CATEGORIES,
  async (filter: object | any = {}, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "GET",
        url: "/categories",
        params: filter,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  types.FETCH_CATEGORY,
  async (id: string | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "GET",
        url: `/categories/${id}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  types.ADD_CATEGORY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "POST",
        url: "/categories",
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  types.UPDATE_CATEGORY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "PUT",
        url: `/category/${obj.id}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  types.DELETE_CATEGORY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "DELETE",
        url: `/category/${obj.id}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     *
     * JOURNAL
     *
     */

    /**
     *
     * Fetch journal entries
     *
     */
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories = [];
      state.categoryStatus.loading = true;
      state.categoryStatus.message = "";
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.loading = false;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.categoryStatus.loading = false;
    });

    /**
     *
     * Fetch single category
     *
     */
    builder.addCase(fetchCategory.pending, (state) => {
      state.category = {};
      state.categoryStatus.loading = true;
      state.categoryStatus.saving = false;
      state.categoryStatus.message = "";
    });

    builder.addCase(fetchCategory.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.loading = false;
    });

    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      const { category, error, message } = action.payload;

      state.categories = category;
      state.categoryStatus.error = error;
      state.categoryStatus.loading = false;
      state.categoryStatus.message = message;
    });

    /**
     *
     * Add category
     *
     */
    builder.addCase(addCategory.pending, (state) => {
      state.category = {};
      state.categoryStatus.loading = false;
      state.categoryStatus.saving = true;
    });

    builder.addCase(addCategory.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.saving = false;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      const { category, message, error } = action.payload;

      state.category = category;
      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.saving = false;
    });

    /**
     *
     * Update category
     *
     */
    builder.addCase(updateCategory.pending, (state) => {
      state.category = {};
      state.categoryStatus.message = "";
      state.categoryStatus.loading = false;
      state.categoryStatus.saving = true;
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.loading = false;
      state.categoryStatus.saving = false;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { category, message, error } = action.payload;

      state.category = category;
      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.saving = false;
    });

    /**
     *
     * Delete category
     *
     */
    builder.addCase(deleteCategory.pending, (state) => {
      state.category = {};
      state.categoryStatus.message = "";
      state.categoryStatus.loading = false;
      state.categoryStatus.saving = true;
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.loading = false;
      state.categoryStatus.saving = false;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const { category, message, error } = action.payload;

      state.categories = category;
      state.categoryStatus.message = message;
      state.categoryStatus.error = error;
      state.categoryStatus.saving = false;
    });
  },
});

export const categoryState = (state: RootState) => state.categories;

export default slice.reducer;
