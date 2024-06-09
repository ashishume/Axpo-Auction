"use client";

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProducts } from "../services/auth/products-service";
import { IProduct } from "../shared/models/Products";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import Loader from "../components/Loader";
import { AppState } from "../store/store";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { isLoading, data } = useSelector((state: AppState) => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Navbar />
      <div className="auction-container">
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((product: IProduct) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </div>
    </>
  );
};

export default Dashboard;
