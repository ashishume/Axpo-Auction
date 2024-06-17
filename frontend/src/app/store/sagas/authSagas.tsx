// import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginStart,
  loginSuccess,
  validateStart,
  validateSuccess,
  validateFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  loginFailed,
} from "../slices/auth/authSlices";
import { PayloadAction } from "@reduxjs/toolkit";
import { Axios } from "@/app/services/auth/auth-service";

export function* loginApiCall(
  action: PayloadAction<{ email: string; password: string }>
): Generator<any, any, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.post, "/login", action.payload);
    yield put(loginSuccess(result?.data));
  } catch (e: any) {
    console.error(e?.message);
    return put(loginFailed(e?.message));
  }
}

export function* validateAuth(): Generator<any, any, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.get, "/validate");
    yield put(validateSuccess(result?.data));
  } catch (e: any) {
    console.error(e);
    yield put(validateFailed(e?.message));
  }
}

export function* logoutUser(): Generator<any, any, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.post, "/logout");
    return put(logOutSuccess(result?.data));
  } catch (e: any) {
    console.error(e.message);
    yield put(logOutFailed(e?.message));
  }
}

export function* authSaga(): Generator {
  yield takeLatest(loginStart.type, loginApiCall);
  yield takeLatest(validateStart.type, validateAuth);
  yield takeLatest(logOutStart.type, logoutUser);
}

export const signupApiCall = async (credentials: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const result = await Axios.post("/signup", credentials);
    return result;
  } catch (e: any) {
    console.error(e.message);
  }
};
