import { getProducts, getProductsDataById } from "@/app/services/auth/products-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/app/shared/models/Products";

export interface IProductByIdState {
  isLoading: boolean;
  data: IProduct | null;
  error: ErrorEvent | null;
}

export const initialState: IProductByIdState = {
  isLoading: false,
  data: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductsDataById.pending,
      (state: IProductByIdState, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      }
    );
    builder.addCase(
      getProductsDataById.fulfilled,
      (state: IProductByIdState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      getProductsDataById.rejected,
      (state: IProductByIdState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
