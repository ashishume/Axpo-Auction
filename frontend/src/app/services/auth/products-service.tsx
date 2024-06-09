import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "./auth-service";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await Axios.get("products");
      if (!res.data) {
        throw new Error("Failed to fetch data");
      }
      return res?.data?.data;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
);

export const getProductsDataById = createAsyncThunk(
  "products/getProductById",
  async (productId: string) => {
    try {
      const res = await Axios.get(`product/${productId}`);
      if (!res.data) {
        throw new Error("Failed to fetch data");
      }
      return res?.data?.data;
    } catch (e) {
      console.error(e);
    }
  }
);
