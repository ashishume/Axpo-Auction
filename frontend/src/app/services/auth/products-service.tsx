import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "./auth-service";
import { IChartData } from "@/app/shared/models/Products";

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
