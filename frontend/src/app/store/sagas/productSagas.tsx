import { IProductPayload } from "@/app/shared/models/Products";
import { Axios } from "@/app/services/auth/auth-service";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loadProducts,
  loadProductsError,
  loadProductsSuccess,
} from "../slices/products/productsSlices";
import {
  loadBidAllowed,
  loadBidAllowedError,
  loadBidAllowedSuccess,
  loadProduct,
  loadProductError,
  loadProductSuccess,
} from "../slices/productSlices/productSlices";
import { PayloadAction } from "@reduxjs/toolkit";

export function* getProducts(): Generator<any, any, AxiosResponse<any>> {
  try {
    const res = yield call(Axios.get, "products");
    yield put(loadProductsSuccess(res?.data?.data));
  } catch (e: any) {
    yield put(loadProductsError(e?.message));
  }
}

export function* getProductsDataById(
  action: PayloadAction<{ productId: number }>
): Generator<any, any, AxiosResponse<any>> {
  try {
    const res = yield call(Axios.get, `product/${action?.payload?.productId}`);
    yield put(loadProductSuccess(res?.data?.data));
  } catch (e: any) {
    yield put(loadProductError(e?.message));
  }
}

export function* fetchBidStatus(
  payload: PayloadAction<{
    productId: number;
    userId: number;
  }>
): Generator<any, any, AxiosResponse<any>> {
  try {
    const res = yield call(Axios.post, "check-bid-status", payload);
    yield put(loadBidAllowedSuccess(res?.data));
  } catch (e: any) {
    yield put(loadBidAllowedError(e?.message));
  }
}

export function* productsSaga(): Generator {
  yield takeLatest(loadBidAllowed.type, fetchBidStatus);
  yield takeLatest(loadProduct.type, getProductsDataById);
  yield takeLatest(loadProducts.type, getProducts);
}

export const updateBidAmount = async (payload: {
  amount: number;
  productId: number;
  userId: number;
}) => {
  try {
    const body = {
      userId: payload.userId,
      productId: payload.productId,
      amount: payload.amount,
      enteredAt: new Date().toISOString(),
    };
    const res = await Axios.post(`bid`, body);
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    return res?.data?.data;
  } catch (e) {
    console.error(e);
  }
};

export const submitNewProduct = async (payload: IProductPayload) => {
  try {
    const res = await Axios.post(`product`, payload);
    if (!res.data) {
      throw new Error("Failed to add product");
    }
    return res?.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
