const express = require("express");
const app = express();

const userRoutes = require("./src/routes/Auth");
const productRoutes = require("./src/routes/Products");

[userRoutes, productRoutes].forEach((apiRoutes) =>
  app.use("/api/v1", apiRoutes)
);
module.exports = app;
