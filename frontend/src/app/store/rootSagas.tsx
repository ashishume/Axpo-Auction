import { all, fork } from "redux-saga/effects";
import { authSaga } from "./sagas/authSagas";
import { productsSaga } from "./sagas/productSagas";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(productsSaga)]);
}
