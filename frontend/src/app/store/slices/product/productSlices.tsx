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
    loadProduct: (state, _) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    },
    loadProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    loadProductError: (state, action: PayloadAction<ErrorEvent>) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    },
    clearProductDetails: (state: IProductByIdState) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
      state.isBidAllowed = null;
    },
    loadBidAllowed: (state, _) => {
      state.isBidAllowed = false;
    },
    loadBidAllowedSuccess: (
      state,
      action: PayloadAction<{ isBidAllowed: boolean }>
    ) => {
      state.isBidAllowed = action.payload.isBidAllowed;
    },
    loadBidAllowedError: (state, _) => {
      state.isBidAllowed = false;
    },
  },
});
export const {
  loadProduct,
  loadProductSuccess,
  loadProductError,
  clearProductDetails,
  loadBidAllowed,
  loadBidAllowedSuccess,
  loadBidAllowedError,
} = productSlice.actions;

export default productSlice.reducer;
