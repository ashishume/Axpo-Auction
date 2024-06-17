import { Axios } from "@/app/services/auth/auth-service";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loadChartData,
  loadChartDataError,
  loadChartDataSuccess,
} from "../slices/chart/chartSlices";
import { AxiosResponse } from "axios";

export function* fetchChartData(
  action: PayloadAction<{ productId: number }>
): Generator<any, any, AxiosResponse<any>> {
  try {
    const res = yield call(Axios.get, `bids/${action?.payload}`);
    yield put(loadChartDataSuccess(res?.data));
  } catch (e: any) {
    console.error(e);
    yield put(loadChartDataError(e?.message));
  }
}

export function* chartsSaga(): Generator {
  yield takeLatest(loadChartData.type, fetchChartData);
}
