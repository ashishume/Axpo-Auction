'use client'

import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string = "") => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue ? JSON.parse(storedValue) : initialValue);
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue: any) => {
    setValue(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  const removeStoredValue = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    setValue(initialValue);
  };

  return { value, setStoredValue, removeStoredValue };
};

export default useLocalStorage;
