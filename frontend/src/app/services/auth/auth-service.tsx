import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:7000/api/v1",
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
