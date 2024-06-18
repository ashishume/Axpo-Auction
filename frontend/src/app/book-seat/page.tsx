import "./style.scss";

const BookSeat = () => {
  const arr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  ];
  return (
    <div className="container">
      {arr.map((row) => {
        return (
          <div className="m-1">
            {row.map((col, i) => {
              return (
                <>
                  <div
                    className="inline-block border border-slate-400	 
                  p-1 m-1 h-10 w-10 hover:bg-slate-400 cursor-pointer 
                  rounded
                  "
                  >
                    <div className="flex justify-center items-center text-slate-600">
                      {col}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BookSeat;
