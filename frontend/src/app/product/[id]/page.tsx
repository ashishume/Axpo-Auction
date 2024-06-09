"use client";
import { getProductsDataById } from "../../services/auth/products-service";
import { useAppDispatch } from "@/app/store/hooks";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import Loader from "@/app/components/Loader";
import BarChartComp from "@/app/components/BarChart";

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
            <h2 className="text-xl font-bold">Product details</h2>
            <img src={data?.product_image} />
            <p className="">{data?.description}</p>
          </>
        ) : (
          <Loader />
        )}
      </aside>
      <main className="flex-1 bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl mb-4">Bid on {data?.name}</h1>

        <div className="flex items-center justify-center">
          <div className="max-w-lg w-full space-y-8">
            <div>
              <label htmlFor="bid_amount" className="sr-only">
                Enter your bid amount
              </label>
              <div className="relative">
                <input
                  id="bid_amount"
                  name="bid_amount"
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                  placeholder="Enter your bid amount"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

        {data ? (
          <BarChartComp name={data.name} productId={data?.id.toString()} />
        ) : null}
      </main>
    </div>
  );
};

export default ProductPage;
