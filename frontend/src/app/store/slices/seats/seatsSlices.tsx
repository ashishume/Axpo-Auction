import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeat } from "@/app/shared/models/Seats";

export interface ISeatState {
  isLoading: boolean;
  data: ISeat[];
  error: string | null;
}

export const initialState: ISeatState = {
  isLoading: false,
  data: [],
  error: null,
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    loadSeats: (state: ISeatState, _) => {
      state.isLoading = true;
      state.data = [];
      state.error = null;
    },
    loadSeatsSuccess: (state: ISeatState, action: PayloadAction<ISeat[]>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    loadSeatsError: (state: ISeatState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
    clearSeats: (state: ISeatState) => {
      state.isLoading = false;
      state.data = [];
      state.error = null;
    },
  },
});

export const { loadSeats, loadSeatsSuccess, clearSeats, loadSeatsError } =
  seatsSlice.actions;

export default seatsSlice.reducer;
