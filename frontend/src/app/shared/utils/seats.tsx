export const createSeats = () => {
  let rows = [];
  for (let i = 65; i <= 68; i++) {
    let cols = [];
    for (let j = 1; j <= 20; j++) {
      cols.push(`${String.fromCharCode(i)}${j}`);
    }
    rows.push(cols);
  }
  return rows;
};
