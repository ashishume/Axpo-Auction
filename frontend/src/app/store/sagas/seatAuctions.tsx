import { Axios } from "@/app/services/auth/auth-service";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loadSeats,
  loadSeatsError,
  loadSeatsSuccess,
} from "../slices/seats/seatsSlices";
import { ISeatPayload } from "@/app/shared/models/Seats";

export function* getSeatsByProductId(
  action: PayloadAction<{ productId: number }>
): Generator<any, any, AxiosResponse<any>> {
  try {
    const res = yield call(Axios.get, `seats/${action.payload}`);
    yield put(loadSeatsSuccess(res?.data?.data));
  } catch (e: any) {
    yield put(loadSeatsError(e?.response?.data?.message));
  }
}

export const submitSeatsDetails = async (payload: ISeatPayload) => {
  try {
    const res = await Axios.post(`book-seat`, payload);
    if (!res.data) {
      throw new Error("Failed to add product");
    }
    return res?.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export function* seatsSaga(): Generator {
  yield takeLatest(loadSeats.type, getSeatsByProductId);
}
