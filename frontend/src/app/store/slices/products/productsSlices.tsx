import { getProducts } from "@/app/services/auth/products-service";
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProducts.pending,
      (state: IProductState, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.data = [];
        state.error = null;
      }
    );
    builder.addCase(
      getProducts.fulfilled,
      (state: IProductState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      getProducts.rejected,
      (state: IProductState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      }
    );
  },
});

export default productsSlice.reducer;
