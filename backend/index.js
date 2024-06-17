const express = require("express");
const app = express();
const port = 7000;
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const createTables = require("./src/utils/createTables");
const dotenv = require('dotenv'); 
require("./src/controllers/db-connect");
app.use(cookieParser());
dotenv.config(); // Load environment variables from .env file

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Axpo auction");
});
//define all the routes index
app.use(routes);

createTables();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
