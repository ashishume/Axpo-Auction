const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../controllers/db-connect");

// Create and save a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadySignedUp = await pool.query(
      `
    SELECT email FROM users where email=$1
    `,
      [email]
    );
    if (isAlreadySignedUp?.rowCount === 0) {
      const results = await pool.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [name, email, password]
      );
      return res.status(201).json({
        id: results.rows[0].id,
        message: "User signed up successfully",
      });
    } else {
      return res.status(409).json({ message: "User already signed up" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );

    if (user.rowCount === 1) {
      // User authenticated successfully
      return res
        .status(200)
        .json({ message: "Login successful", user: user.rows[0] });
    } else {
      // User not found or invalid credentials
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all users API without returning password
router.get("/users", async (req, res) => {
  try {
    const users = await pool.query(`SELECT id, name, email FROM users`);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
