import { combineReducers } from "redux";
import authSlices from "./slices/auth/authSlices";
import chartSlices from "./slices/chart/chartSlices";
import productsSlices from "./slices/products/productsSlices";
import productSlices from "./slices/product/productSlices";
import seatsSlices from "./slices/seats/seatsSlices";

const rootReducers = combineReducers({
  products: productsSlices,
  seats: seatsSlices,
  product: productSlices,
  chart: chartSlices,
  auth: authSlices,
});

export default rootReducers;
