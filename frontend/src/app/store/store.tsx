import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./rootReducers";
import rootSaga from "./rootSagas";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
