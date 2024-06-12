import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "./auth-service";
import { IChartData, IProductPayload } from "@/app/shared/models/Products";

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
export const fetchBidStatus = createAsyncThunk(
  "products/fetchBidStatus",
  async (payload: {
    productId: number;
    userId: number;
  }): Promise<{ isBidAllowed: boolean }> => {
    try {
      const res = await Axios.post("check-bid-status", payload);
      if (!res.data) {
        throw new Error("Failed to fetch data");
      }
      return res?.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
export const fetchChartData = createAsyncThunk(
  "products/fetchChartData",
  async (productId: number): Promise<IChartData> => {
    try {
      const res = await Axios.get(`bids/${productId}`);
      if (!res.data) {
        throw new Error("Failed to fetch data");
      }
      return res?.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const updateBidAmount = async (payload: {
  amount: number;
  productId: number;
  userId: number;
}) => {
  try {
    const body = {
      userId: payload.userId,
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

export const submitNewProduct = async (payload: IProductPayload) => {
  try {
    const res = await Axios.post(`product`, payload);
    if (!res.data) {
      throw new Error("Failed to add product");
    }
    return res?.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
