"use client";
import { getProductsDataById } from "../../services/auth/products-service";
import { useAppDispatch } from "@/app/store/hooks";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import Loader from "@/app/components/Loader";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useSelector((state: AppState) => state.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductsDataById(id as string));
  }, []);
  return (
    <div className="flex gap-8 p-8">
      <aside className="w-64 bg-white p-4 rounded-lg shadow-lg shadow-black-100">
        {!isLoading ? (
          <>
            <h2 className="text-xl font-bold">{data?.name}</h2>
            <img src={data?.product_image} />
            <p className="">{data?.description}</p>
          </>
        ) : (
          <Loader />
        )}
      </aside>
      <main className="flex-1 bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
        <p>{data?.description}</p>
      </main>
    </div>
  );
};

export default ProductPage;
