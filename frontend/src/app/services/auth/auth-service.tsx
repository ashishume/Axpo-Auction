import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "http://localhost:7000/api/v1/";
export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// export const loginApiCall = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const result = await Axios.post("/login", credentials);
//     return result?.data;
//   } catch (e: any) {
//     console.error(e.message);
//   }
// };
// export const signupApiCall = async (credentials: {
//   email: string;
//   password: string;
//   name: string;
// }) => {
//   try {
//     const result = await Axios.post("/signup", credentials);
//     return result;
//   } catch (e: any) {
//     console.error(e.message);
//   }
// };

// export const validateAuth = createAsyncThunk("auth/validate", async () => {
//   try {
//     const result = await Axios.get("/validate");
//     return result?.data;
//   } catch (e: any) {
//     console.error(e);
//     return { isLoggedIn: false };
//   }
// });
// export const logoutUser = createAsyncThunk("auth/logout", async () => {
//   try {
//     const result = await Axios.post("/logout");
//     return result?.data;
//   } catch (e: any) {
//     console.error(e.message);
//   }
// });
