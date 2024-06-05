const express = require("express");
const router = express.Router();
const authenticateToken = require("../controllers/authMiddleware");
const pool = require("../controllers/db-connect");

// Create and save a new product
router.post("/product", async (req, res) => {});

module.exports = router;
