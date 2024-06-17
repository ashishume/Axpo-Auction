import axios from "axios";

export const BASE_URL = "http://localhost:7000/api/v1/";
export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
