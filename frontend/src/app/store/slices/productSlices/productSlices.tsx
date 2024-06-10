import {
  fetchBidStatus,
  getProductsDataById,
} from "@/app/services/auth/products-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/app/shared/models/Products";

export interface IProductByIdState {
  isLoading: boolean;
  data: IProduct | null;
  error: ErrorEvent | null;
  isBidAllowed: boolean | null;
}

export const initialState: IProductByIdState = {
  isLoading: false,
  data: null,
  error: null,
  isBidAllowed: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductDetails: (state: IProductByIdState) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
      state.isBidAllowed = null;
    },
  },
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
    // fetch bid status
    builder.addCase(fetchBidStatus.pending, (state: IProductByIdState, _) => {
      state.isBidAllowed = false;
    });
    builder.addCase(
      fetchBidStatus.fulfilled,
      (
        state: IProductByIdState,
        action: PayloadAction<{ isBidAllowed: boolean }>
      ) => {
        state.isBidAllowed = action.payload.isBidAllowed;
      }
    );
  },
});
export const { clearProductDetails } = productSlice.actions;

export default productSlice.reducer;
