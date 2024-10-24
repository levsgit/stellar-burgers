import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser;
  error: string | null | undefined;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const getUserThunk = createAsyncThunk('user/auth', async () =>
  getUserApi()
);

export const registrationUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => updateUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
      state.isInit = false;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.user = action.payload.user;
    });

    builder.addCase(registrationUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registrationUserThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error.message;
    });
    builder.addCase(registrationUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isInit = true;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isInit = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = { email: '', name: '' };
      state.isInit = false;
    });

    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isInit = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isInit = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.error = '';
      });
  }
});

export default userSlice;
