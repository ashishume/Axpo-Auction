const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../controllers/db-connect");
const authenticateToken = require("../controllers/authMiddleware");
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const results = await pool.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [name, email, hashedPassword]
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
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount === 1) {
      const userResult = user.rows[0];
      const isPasswordValid = await bcrypt.compare(password, userResult.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: userResult.id },
        process.env.SECRET_KEY,
        {
          expiresIn: "3h",
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res
        .status(200)
        .json({ message: "Login successful", user: userResult });
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
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query(`SELECT id, name, email FROM users`);
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/validate", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const authTokenExp = jwt.verify(token, process.env.SECRET_KEY);
      res.status(200).json({
        isLoggedIn: true,
        authTokenExp,
      });
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", isLoggedIn: false });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
