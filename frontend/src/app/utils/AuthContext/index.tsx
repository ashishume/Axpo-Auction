"use client";
import Navbar from "@/app/components/Navbar";
import { useAppDispatch } from "@/app/store/hooks";
import { validateStart } from "@/app/store/slices/auth/authSlices";
import { ReactNode, useEffect } from "react";

const AuthContext = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(validateStart());
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthContext;
