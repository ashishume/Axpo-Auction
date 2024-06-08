import { BASE_URL } from "./auth-service";

export const getProductsData = async () => {
  const res = await fetch(BASE_URL + "products");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
