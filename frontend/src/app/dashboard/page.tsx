"use client";

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProducts } from "../services/auth/products-service";
import { IProduct } from "../shared/models/Products";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import Loader from "../components/Loader";
import { AppState } from "../store/store";

const Dashboard = () => {
  const { isLoading, data } = useSelector((state: AppState) => state?.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <div className="auction-container block h-auto">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        ) : data?.length ? (
          data?.map((product: IProduct) => {
            return <ProductCard key={product.id} product={product} />;
          })
        ) : (
          <div className="text-center bg-red inline-block w-full text-2xl">
            {" "}
            No products found
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
