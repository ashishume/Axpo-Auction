"use client";
import { useEffect, useState } from "react";
import "chart.js/auto";
import { useAppSelector } from "@/app/store/hooks";
import { Bar } from "react-chartjs-2";

const BarChartComp = ({ name = "" }: { name: string }) => {
  const [chartData, setChartData] = useState([] as any);
  const [label, setLabel] = useState([] as any);
  const { data } = useAppSelector((state) => state.chart);
  useEffect(() => {
    (async () => {
      let payload: any = [];
      data?.data?.map((value: { amount: string }) => {
        payload.push(Number((value as any)?.amount));
      });
      setLabel(data?.data?.map((val: any) => `₹${val?.amount}`));
      setChartData(payload);
    })();
  }, [data]);

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

  const chartDataSets = {
    labels: label,
    datasets: [
      {
        label: "Visualisation data for the bids",
        data: chartData,
        backgroundColor: "rgba(52, 152, 235,0.8)",
      },
    ],
  };

  return (
    <div className="h-72 flex justify-center">
      <Bar options={options} data={chartDataSets} />
    </div>
  );
};

export default BarChartComp;
