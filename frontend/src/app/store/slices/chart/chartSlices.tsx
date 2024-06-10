import { fetchChartData } from "@/app/services/auth/products-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChartData } from "@/app/shared/models/Products";

export interface IChartDataState {
  isLoading: boolean;
  data: IChartData | null;
  error: ErrorEvent | null;
}

export const initialState: IChartDataState = {
  isLoading: false,
  data: null,
  error: null,
};

const chartDataSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.pending, (state: IChartDataState, _) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(
      fetchChartData.fulfilled,
      (state: IChartDataState, action: PayloadAction<IChartData>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchChartData.rejected,
      (state: IChartDataState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
      }
    );
  },
});

export default chartDataSlice.reducer;
