"use client";
import Navbar from "@/app/components/Navbar";
// import { validateAuth } from "@/app/services/auth/auth-service";
import { useAppDispatch } from "@/app/store/hooks";
import { validateAuth } from "@/app/store/sagas/authSagas";
import React, { ReactNode, useEffect } from "react";

const AuthContext = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(validateAuth());
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthContext;
