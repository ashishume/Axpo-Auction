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
  reducers: {
    loadChartData: (state: IChartDataState, _) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    },
    loadChartDataSuccess: (
      state: IChartDataState,
      action: PayloadAction<IChartData>
    ) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    loadChartDataError: (
      state: IChartDataState,
      action: PayloadAction<ErrorEvent>
    ) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});
export const { loadChartData, loadChartDataSuccess, loadChartDataError } =
  chartDataSlice.actions;
export default chartDataSlice.reducer;
