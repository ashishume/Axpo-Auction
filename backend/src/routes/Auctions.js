const express = require("express");
const router = express.Router();
const authenticateToken = require("../controllers/authMiddleware");
const pool = require("../controllers/db-connect");

router.post("/book-seat", async (req, res) => {
  const { productId, userId, seatNumber, createdAt } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO seats (product_id, user_id, seat_number, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [productId, userId, seatNumber, createdAt]
    );
    res
      .status(201)
      .json({ id: results.rows[0].id, message: "Seats added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/seats/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await pool.query(
      `SELECT seats.id, seats.seat_number, seats.created_at, 
      users.name as user_name, users.email as user_email,
      products.name as product_name, products.description as product_description,
      products.min_bid_price as product_price, 
      products.product_image as product_image,
      products.last_date_bid as last_date_bid
      FROM seats
      JOIN users on seats.user_id = users.id
      JOIN products ON seats.product_id = products.id
      WHERE seats.product_id = $1
      ORDER BY seats.created_at DESC`,
      [productId]
    );
    if (results.rowCount) {
      return res.status(200).json({ data: results.rows });
    } else {
      res.status(200).json({ data: [], message: "No seats booked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
