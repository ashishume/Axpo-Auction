// sagas.ts
import { all, fork } from "redux-saga/effects";
import exampleSaga from "./sagas/exampleSaga";
// Import your individual sagas here

export default function* rootSaga() {
  yield all([
    fork(exampleSaga),
    // Add other sagas here
  ]);
}
