"use client";
import { validateAuth } from "@/app/services/auth/auth-service";
import { useAppDispatch } from "@/app/store/hooks";
import React, { ReactNode, useEffect } from "react";

const AuthContext = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(validateAuth());
  }, []);
  return <>{children}</>;
};

export default AuthContext;
