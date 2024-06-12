"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { submitNewProduct } from "../services/auth/products-service";
import { IProductPayload } from "../shared/models/Products";
import { useRouter } from "next/navigation";

const BiddingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const renderError = (error: any) => {
    if (error?.message) {
      return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
    }
    return null;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      ...(data as IProductPayload),
      createdAt: new Date().toISOString().toString(),
    };

    const res = await submitNewProduct(payload);
    if (res) {
      router.push("/");
      await setIsSubmitting(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Place Your Bid
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {renderError(errors.name)}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {renderError(errors.description)}
        </div>

        <div className="mb-4">
          <label
            htmlFor="minBidPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Bid Price
          </label>
          <input
            id="minBidPrice"
            type="number"
            {...register("minBidPrice", {
              required: "Minimum bid price is required",
              min: 0,
            })}
            className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border rounded-md ${
              errors.minBidPrice ? "border-red-500" : "border-gray-300"
            }`}
          />
          {renderError(errors.minBidPrice)}
        </div>

        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image URL
          </label>
          <input
            id="productImage"
            type="text"
            {...register("productImage", {
              required: "Product image URL is required",
            })}
            className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border rounded-md ${
              errors.productImage ? "border-red-500" : "border-gray-300"
            }`}
          />
          {renderError(errors.productImage)}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastDateBid"
            className="block text-sm font-medium text-gray-700"
          >
            Last Date to Bid
          </label>
          <input
            id="lastDateBid"
            type="date"
            {...register("lastDateBid", {
              required: "Last date to bid is required",
            })}
            min={new Date().toISOString().split("T")[0]}
            className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border rounded-md ${
              errors.lastDateBid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {renderError(errors.lastDateBid)}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Submit Bid"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiddingForm;
