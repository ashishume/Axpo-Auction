import axios from "axios";

export const BASE_URL = "http://localhost:7000/api/v1/";
export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const loginApiCall = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const result = await Axios.post("/login", credentials);
    return result;
  } catch (e: any) {
    console.error(e.message);
  }
};
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
