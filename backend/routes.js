const express = require("express");
const app = express();

const userRoutes = require("./src/routes/Auth");
const productRoutes = require("./src/routes/Products");
const bidProducts = require("./src/routes/BidProducts");
const seats = require("./src/routes/Auctions");
// const allowCors = require("./src/utils/allowCors");

[userRoutes, productRoutes, bidProducts, seats].forEach((apiRoutes) =>
  app.use("/api/v1", apiRoutes)
);
module.exports = app;
