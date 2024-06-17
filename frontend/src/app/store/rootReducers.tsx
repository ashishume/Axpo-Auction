import { combineReducers } from "redux";
import authSlices from "./slices/auth/authSlices";
import chartSlices from "./slices/chart/chartSlices";
import productsSlices from "./slices/products/productsSlices";
import productSlices from "./slices/product/productSlices";

const rootReducers = combineReducers({
  products: productsSlices,
  product: productSlices,
  chart: chartSlices,
  auth: authSlices,
});

export default rootReducers;
