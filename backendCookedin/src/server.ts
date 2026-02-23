import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT: number = 2001;
const USERS_FILE: string = "users.csv";

// Middleware
app.use(cors());
app.use(express.json());

/*
  Health Check Route
*/
app.get("/", (req: Request, res: Response) => {
  res.send("CookedIn Backend Running 🚀");
});

/*
  Register User
*/
app.post("/register", (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  // Basic validation
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  // Read existing users first (to check duplicate username)
  fs.readFile(USERS_FILE, "utf8", (readError, fileData) => {
    if (readError) {
      res.status(500).json({ message: "Failed to read users file" });
      return;
    }

    const lines: string[] = fileData.split("\n");

    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row) continue;

      const [storedUsername] = row.split(",");

      if (storedUsername === username) {
        res.status(409).json({ message: "Username already exists" });
        return;
      }
    }

    // If username not found → append new user
const newUserLine: string = `\n${username},${password}`;
    fs.appendFile(USERS_FILE, newUserLine, (writeError) => {
      if (writeError) {
        res.status(500).json({ message: "Failed to save user" });
        return;
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

/*
  Login User
*/
app.post("/login", (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  fs.readFile(USERS_FILE, "utf8", (error, fileData) => {
    if (error) {
      res.status(500).json({ message: "Failed to read users file" });
      return;
    }

    const lines: string[] = fileData.split("\n");

    let userFound: boolean = false;

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i];
      if (!row) continue;

      const [storedUsername, storedPassword] = row.split(",");

      if (storedUsername === username) {
        userFound = true;

        if (storedPassword === password) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }

        return;
      }
    }

    if (!userFound) {
      res.status(404).json({ message: "User not found" });
    }
  });
});

/*
  Start Server
*/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});