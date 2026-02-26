import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { db } from "./db";

const app = express();
const PORT = 2001;

app.use(cors());     //middleware to allow cross-origin requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CookedIn Backend Running 🚀");
});


// ================= REGISTER =================

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  try {
    // Check if username already exists
    const result = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    const rows = result[0] as any[];   // first item contains data

    if (rows.length > 0) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Database error"
    });
  }
});


// ================= LOGIN =================

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    const rows = result[0] as any[];

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = rows[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Database error"
    });
  }
});


// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});