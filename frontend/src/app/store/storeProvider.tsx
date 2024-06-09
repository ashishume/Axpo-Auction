"use client";
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";

interface ReduxProviderProps {
  children: ReactNode;
  pageProps: any;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({
  children,
}) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
