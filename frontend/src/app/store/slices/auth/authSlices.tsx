import { createSlice } from "@reduxjs/toolkit";
// import { logoutUser, validateAuth } from "@/app/services/auth/auth-service";

export interface IAuthState {
  isLoggedIn: boolean | null;
  user: any;
  error: null | string;
  isLoading: boolean;
}

export const initialState: IAuthState = {
  isLoggedIn: null,
  user: null,
  error: null,
  isLoading: false,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, _) => {
      state.isLoggedIn = null;
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    validateStart: (state) => {
      state.isLoggedIn = null;
      state.error = null;
    },
    validateSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    validateFailed: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logOutStart: (state) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    logOutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = null;
    },
    logOutFailed: (state, action) => {
      state.isLoggedIn = true;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  validateStart,
  validateSuccess,
  validateFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlices.actions;

export default authSlices.reducer;
