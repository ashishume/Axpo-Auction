const express = require("express");
const app = express();

const userRoutes = require("./src/routes/Auth");
const productRoutes = require("./src/routes/Products");
const bidProducts = require("./src/routes/BidProducts");
const allowCors = require("./src/utils/allowCors");

[userRoutes, productRoutes, bidProducts].forEach((apiRoutes) =>
  app.use("/api/v1", apiRoutes)
);
module.exports = app;
