"use client";
import { Fragment, useEffect, useState } from "react";
import "./style.scss";

const BookSeat = () => {
  const [seats, setSeats] = useState<string[][]>([]);

  useEffect(() => {
    let rows = [];
    for (let i = 65; i <= 68; i++) {
      let cols = [];
      for (let j = 1; j <= 20; j++) {
        cols.push(`${String.fromCharCode(i)}${j}`);
      }
      rows.push(cols);
    }
    setSeats(rows);
  }, []);

  const selectSeat = (col: string) => {
    console.log(col);
  };
  return (
    <div className="container my-5 grid place-items-center">
      <div className="text-xl font-bold uppercase">
        Boook your seats for auction
      </div>
      {seats.map((row, i) => {
        return (
          <div key={i} className="m-1 flex flex-nowrap">
            {row.map((col, j) => {
              return (
                <Fragment key={col}>
                  <div
                    className={`inline-block border border-slate-400	 
                      p-1 m-1 h-10 min-w-10 w-10 hover:bg-slate-400 cursor-pointer
                      rounded ${j === 10 ? "ml-10" : ""} 
                      `}
                  >
                    <div
                      className="text-center text-slate-600"
                      onClick={() => selectSeat(col)}
                    >
                      {col}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        );
      })}

      <div className="w-2/4 rounded  py-5 bg-slate-300">
        <h1 className="text-center">Auction table</h1>
        <div className="flex justify-center items-center">
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
          <div className="h-5 w-5 bg-slate-500 m-1 p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default BookSeat;
