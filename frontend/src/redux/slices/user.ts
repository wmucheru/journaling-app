import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAPI } from "@/utils/api";

import * as types from "@/redux/actions/actionTypes";
import type { RootState } from "@/redux/store";

interface IState {
  user: object;
  account: object;
  userStatus: {
    message: string;
    error: boolean;
    loading: boolean;
    saving: boolean;
  };
}

const initialState: IState = {
  user: {},
  account: {},
  userStatus: {
    message: "",
    error: false,
    loading: false,
    saving: false,
  },
};

/**
 *
 * Users
 *
 */
export const registerUser = createAsyncThunk(
  types.REGISTER_USER,
  async (obj: object | any = {}, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "POST",
        url: "/auth/register",
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  types.LOGIN_USER,
  async (obj: object | any = {}, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "POST",
        url: "/auth/login",
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserAccount = createAsyncThunk(
  types.FETCH_USER_ACCOUNT,
  async (filter: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "GET",
        url: "/auth/users",
        params: filter,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  types.UPDATE_JOURNAL_ENTRY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "PUT",
        url: `/auth/users/${obj.id}`,
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     * Register User
     *
     */
    builder.addCase(registerUser.pending, (state) => {
      state.user = {};
      state.userStatus.loading = true;
      state.userStatus.message = "";
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user, message } = action.payload;

      state.user = user;
      state.userStatus.loading = false;
      state.userStatus.message = message;
    });

    /**
     *
     * Login User
     *
     */
    builder.addCase(loginUser.pending, (state) => {
      state.user = {};
      state.userStatus.loading = true;
      state.userStatus.message = "";
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { token } = action.payload;

      state.user = { token };
      state.userStatus.loading = false;
    });

    /**
     *
     * Get user account
     *
     */
    builder.addCase(getUserAccount.pending, (state) => {
      state.user = {};
      state.account = {};
      state.userStatus.loading = false;
      state.userStatus.saving = true;
    });

    builder.addCase(getUserAccount.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.saving = false;
    });

    builder.addCase(getUserAccount.fulfilled, (state, action) => {
      const { user, message, error } = action.payload;

      state.account = user;
      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.saving = false;
    });

    /**
     *
     * Update journal entry
     *
     */
    builder.addCase(updateUserAccount.pending, (state) => {
      state.user = {};
      state.userStatus.message = "";
      state.userStatus.loading = false;
      state.userStatus.saving = true;
    });

    builder.addCase(updateUserAccount.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
      state.userStatus.saving = false;
    });

    builder.addCase(updateUserAccount.fulfilled, (state, action) => {
      const { user, message, error } = action.payload;

      state.user = user;
      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.saving = false;
    });
  },
});

export const userState = (state: RootState) => state.users;

export const { resetUser } = slice.actions;

export default slice.reducer;
