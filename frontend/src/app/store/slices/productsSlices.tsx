import { IProduct } from "@/app/shared/models/Products";
import { createSlice } from "@reduxjs/toolkit";

export interface RootState {
  products: IProduct[];
}

const initialState: RootState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
