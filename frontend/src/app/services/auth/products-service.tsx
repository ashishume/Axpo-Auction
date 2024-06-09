import { Axios } from "./auth-service";

export const getProductsData = async () => {
  try {
    const res = await Axios.get("products");
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    return res?.data;
  } catch (e) {
    console.error(e);
  }
};
export const getProductsDataById = async (productId: string) => {
  try {
    const res = await Axios.get(`product/${productId}`);
    if (!res.data) {
      throw new Error("Failed to fetch data");
    }
    return res?.data;
  } catch (e) {
    console.error(e);
  }
};
