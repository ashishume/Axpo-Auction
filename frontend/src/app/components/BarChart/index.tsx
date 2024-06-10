"use client";
import { Axios } from "@/app/services/auth/auth-service";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { fetchChartData } from "@/app/services/auth/products-service";

const BarChartComp = ({
  name = "",
  productId,
}: {
  name: string;
  productId: number;
}) => {
  const [chartData, setChartData] = useState([] as any);
  const [label, setLabel] = useState([] as any);

  useEffect(() => {
    (async () => {
      const response = await fetchChartData(productId);
      let payload: any = [];
      response.map((value: { amount: string }) => {
        payload.push(Number((value as any)?.amount));
      });
      setLabel(response.map((val: any) => `₹${val?.amount}`));
      setChartData(payload);
    })();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Ongoing bids for ${name}`,
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: "Visualisation data for the bids",
        data: chartData,
        backgroundColor: "rgba(52, 152, 235,0.8)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChartComp;
