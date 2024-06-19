"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppState } from "@/app/store/store";
import Loader from "@/app/components/Loader";
import BarChartComp from "@/app/components/BarChart";
import { Block } from "@mui/icons-material";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import {
  IChartDataState,
  loadChartData,
} from "@/app/store/slices/chart/chartSlices";
import { updateBidAmount } from "@/app/store/sagas/productSagas";
import {
  clearProductDetails,
  loadBidAllowed,
  loadProduct,
} from "@/app/store/slices/product/productSlices";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [bidAmount, setBidAmount] = useState(0);
  const router = useRouter();

  const { isLoading, data, isBidAllowed } = useAppSelector(
    (state: AppState) => state.product
  );
  const chartData: IChartDataState = useAppSelector((state) => state.chart);

  const { id } = useParams();
  const local = useLocalStorage("user");
  useEffect(() => {
    dispatch(loadProduct(id as string));
    dispatch(
      loadBidAllowed({
        productId: Number(id),
        userId: (local.value as any)?.id,
      })
    );
    dispatch(loadChartData(Number(id)));

    return () => {
      dispatch(clearProductDetails());
    };
  }, []);

  const onBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (
      data?.min_bid_price &&
      e.target.value &&
      Number(e.target.value) < Number(data?.min_bid_price)
    ) {
      setError(`₹${e.target.value} is less than minimum bid price`);
    } else {
      setBidAmount(Number(e.target.value));
    }
  };
  const placeBid = async () => {
    if (data?.id) {
      const { id } = local.value as any;
      await updateBidAmount({
        amount: Number(bidAmount),
        productId: data.id,
        userId: id,
      });

      dispatch(loadChartData(Number(id)));
    }
  };

  return (
    <div className="flex gap-8 p-8">
      <aside className="w-96 bg-white p-4 rounded-lg shadow-lg shadow-black-100">
        {!isLoading ? (
          <>
            <h2 className="text-xl font-bold pb-4">Product details</h2>
            <img src={data?.product_image} />
            <p className="py-5">{data?.description}</p>
            <div className="text-md border-t my-5 py-5">
              Last date to bid:
              <div className="text-xl font-bold">
                {data?.last_date_bid
                  ? new Date(data?.last_date_bid).toDateString()
                  : null}
              </div>
            </div>
            {chartData?.data?.highestBidderDetails ? (
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="bg-white rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Highest Bidder</h2>
                  <p className="text-gray-700">
                    <strong>Name:</strong>{" "}
                    {chartData?.data?.highestBidderDetails?.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Amount:</strong> ₹
                    {chartData?.data?.highestBidderDetails?.amount}
                  </p>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </aside>
      <main className="flex-1 bg-white p-4 rounded-lg shadow">
        {data?.is_bidding_date_expired ? (
          <h1 className="text-3xl mb-4">
            Bidding closed <Block fontSize="medium" />
          </h1>
        ) : (
          <>
            <h1 className="text-3xl mb-4">Bid on {data?.name} </h1>
            <div className="text-md pb-3">
              Minimum bid amount:
              <span className="font-bold"> ₹{data?.min_bid_price}</span>
            </div>
          </>
        )}
        {isBidAllowed === true ? (
          <div className="flex items-center justify-center">
            <div className="max-w-lg w-full space-y-8">
              <div className="relative">
                <input
                  id="bid_amount"
                  name="bid_amount"
                  type="number"
                  min={data?.min_bid_price}
                  onChange={onBidAmountChange}
                  disabled={data?.is_bidding_date_expired}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
                  placeholder={
                    !data?.is_bidding_date_expired
                      ? "Enter your bid amount"
                      : "Bidding date expired"
                  }
                />
                {error ? (
                  <p className="text-sm text-rose-700 my-2">{error}</p>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    data?.is_bidding_date_expired ||
                    !!error?.length ||
                    Number(bidAmount) <= 0
                  }
                  className="w-full flex justify-center py-2 
                  px-4 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white 
                  bg-teal-500 hover:bg-teal-700 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                  disabled:bg-gray-400 disabled:cursor-not-allowed 
                  disabled:hover:bg-gray-400"
                  onClick={placeBid}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        ) : isBidAllowed === false ? (
          <div className="text-rose-500">
            You have already placed your bid, please wait for the auction to get
            closed
          </div>
        ) : null}

        {data ? <BarChartComp name={data.name} /> : null}

        <div className="my-5">
          <h1 className="text-2xl text-center">
            <button
              disabled={isBidAllowed as boolean}  //disable ui yet to be added
              className="border border-teal-500 text-teal-500
              hover:bg-teal-500 hover:text-white
              py-2 px-4 rounded-full transition duration-300 ease-in-out "
              onClick={() => router.push(`/book-seat/${id}`)}
            >
              Book seats for live auction
            </button>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
