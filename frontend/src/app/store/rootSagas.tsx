import { all, fork } from "redux-saga/effects";
import { authSaga } from "./sagas/authSagas";
import { productsSaga } from "./sagas/productSagas";
import { chartsSaga } from "./sagas/chartSagas";
import { seatsSaga } from "./sagas/seatAuctions";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(productsSaga),
    fork(chartsSaga),
    fork(seatsSaga),
  ]);
}
