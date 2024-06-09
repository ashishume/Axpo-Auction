import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productsSlices from "./slices/products/productsSlices";
import productSlices from "./slices/productSlices/productSlices";
import authSlices from "./slices/auth/authSlices";

export const makeStore = () =>
  configureStore({
    reducer: combineReducers({
      products: productsSlices,
      product: productSlices,
      auth: authSlices,
    }),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
