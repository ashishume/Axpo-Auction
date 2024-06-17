// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginSuccess,
  logOutSuccess,
  validateFailed,
  validateSuccess,
} from "../slices/auth/authSlices";

export const BASE_URL = "http://localhost:7000/api/v1/";
export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export function* loginApiCall(credentials: {
  email: string;
  password: string;
}): Generator<any, void, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.post, "/login", credentials);
    yield put(loginSuccess(result?.data));
  } catch (e: any) {
    console.error(e.message);
  }
}

export function* validateAuth(): Generator<any, any, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.get, "/validate");
    yield put(validateSuccess(result?.data));
  } catch (e: any) {
    console.error(e);
    return validateFailed();
  }
}

export function* logoutUser(): Generator<any, any, AxiosResponse<any>> {
  try {
    const result = yield call(Axios.post, "/logout");
    return logOutSuccess(result?.data);
  } catch (e: any) {
    console.error(e.message);
  }
}

export function* authSaga(): Generator {
  yield takeLatest(loginSuccess.type, loginApiCall);
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


