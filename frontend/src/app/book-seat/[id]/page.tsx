"use client";
import { Fragment, useEffect, useState } from "react";
import "./style.scss";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useParams } from "next/navigation";
import { submitSeatsDetails } from "@/app/store/sagas/seatAuctions";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearSeats, loadSeats } from "@/app/store/slices/seats/seatsSlices";
import { createSeats } from "@/app/shared/utils/seats";
import Loader from "@/app/components/Loader";
import Snackbar from "@/app/components/Snackbar";

const BookSeat = () => {
  const [seats, setSeats] = useState<string[][]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.seats);

  useEffect(() => {
    setSeats(createSeats());
    dispatch(loadSeats(Number(id)));

    return () => {
      dispatch(clearSeats());
    };
  }, [id]);

  useEffect(() => {
    let booked: string[] = [];
    for (let i = 0; i < 4; i++) {
      data?.map((seat) => {
        if (
          !booked.includes(seat.seat_number) &&
          seats[i].includes(seat.seat_number)
        ) {
          booked.push(seat.seat_number);
        }
      });
    }
    setBookedSeats(booked);
  }, [data]);

  const { value } = useLocalStorage("user");
  const selectSeat = async (seatNumber: string) => {
    const payload = {
      productId: Number(id),
      seatNumber,
      userId: (value as any).id,
    };
    const res = await submitSeatsDetails(payload);

    if (res) {
      dispatch(loadSeats(Number(id)));
    }
  };

  return (
    <div className="container my-5 grid place-items-center">
      <div className="text-xl font-bold uppercase">
        Boook your seats for auction
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        seats.map((row, i) => {
          return (
            <div key={i} className="m-1 flex flex-nowrap">
              {row.map((col, j) => {
                return (
                  <Fragment key={col}>
                    <div
                      className={`inline-block border border-slate-400	 
                      p-1 m-1 h-10 min-w-10 w-10 hover:bg-slate-400 cursor-pointer
                      rounded ${j === 10 ? "ml-10" : ""}  ${
                        bookedSeats.includes(col)
                          ? "bg-slate-700 pointer-events-none cursor-not-allowed"
                          : null
                      } 
                      `}
                    >
                      <div
                        className={`text-center text-slate-600 ${
                          bookedSeats.includes(col) ? "text-white" : null
                        }`}
                        onClick={() => selectSeat(col)}
                      >
                        {col}
                      </div>
                    </div>
                  </Fragment>
                );
              })}

              {error ? <Snackbar message={error} /> : null}
            </div>
          );
        })
      )}

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
