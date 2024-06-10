const express = require("express");
const router = express.Router();
const authenticateToken = require("../controllers/authMiddleware");
const pool = require("../controllers/db-connect");

// Create and save a new product
router.post("/bid", async (req, res) => {
  const { userId, productId, amount, enteredAt } = req.body;
  try {
    const checkBidStatus = await pool.query(
      `SELECT * FROM auctions WHERE  user_id=$1 AND product_id=$2
         `,
      [userId, productId]
    );
    if (!checkBidStatus.rowCount) {
      const results = await pool.query(
        `INSERT INTO auctions (user_id, product_id, amount, entered_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [userId, productId, amount, enteredAt]
      );
      res.status(201).json({
        id: results.rows[0].id,
        message: "Bidding added successfully",
      });
    } else {
      res.status(409).json({ message: "User is not allowed to bid again" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.detail || "Internal Server Error" });
  }
});

router.post("/check-bid-status", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const results = await pool.query(
      `
        SELECT * FROM auctions WHERE  user_id=$1 AND product_id=$2
      `,
      [userId, productId]
    );
    return res.status(200).json({
      isBidAllowed: !!!results.rowCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/bids", async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM auctions`);

    return res.status(200).json({
      data: results.rows || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/bids/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await pool.query(
      `SELECT amount FROM auctions WHERE product_id=$1`,
      [productId]
    );

    const highestBidderQuery = await pool.query(
      `
      SELECT 
        a.amount,
        a.entered_at,
        u.name,
        u.email
      FROM auctions a
      JOIN users u ON a.user_id = u.id
      WHERE a.product_id = $1
      ORDER BY a.amount DESC
      LIMIT 1
    `,
      [productId]
    );

    const highestBidderDetails = highestBidderQuery?.rowCount
      ? highestBidderQuery?.rows[0]
      : {};
    return res.status(200).json({
      data: results.rows || [],
      highestBidderDetails: highestBidderDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
