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
export const fetchChartData = async (productId: number) => {
  try {
    const res = await Axios.get(`bids/${productId}`);
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    return res?.data?.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateBidAmount = async (payload: {
  amount: number;
  productId: number;
}) => {
  try {
    const body = {
      userId: "1", //fetch from localstorage
      productId: payload.productId,
      amount: payload.amount,
      enteredAt: new Date().toISOString(),
    };
    const res = await Axios.post(`bid`, body);
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    return res?.data?.data;
  } catch (e) {
    console.error(e);
  }
};
