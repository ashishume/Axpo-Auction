import { Axios } from "./auth-service";

export const getProductsData = async () => {
  const res = await Axios.get("products");
  if (!res.data) {
    throw new Error("Failed to fetch data");
  }
  return res?.data;
};
export const getProductsDataById = async (productId: string) => {
  const res = await Axios.get(`product/${productId}`);
  if (!res.data) {
    throw new Error("Failed to fetch data");
  }
  return res?.data;
};
