import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/app/shared/models/Products";

export interface IProductState {
  isLoading: boolean;
  data: IProduct[];
  error: ErrorEvent | null;
}

export const initialState: IProductState = {
  isLoading: false,
  data: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state: IProductState) => {
      state.isLoading = true;
      state.data = [];
      state.error = null;
    },
    loadProductsSuccess: (
      state: IProductState,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    loadProductsError: (
      state: IProductState,
      action: PayloadAction<ErrorEvent>
    ) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { loadProducts, loadProductsSuccess, loadProductsError } =
  productsSlice.actions;

export default productsSlice.reducer;
