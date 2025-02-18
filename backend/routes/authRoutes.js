const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "pratik";
require("dotenv").config();

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
      console.log("Incoming Register Request:", req.body); 

      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Add this logging
      console.log("Checking for existing user...");
      let user = await User.findOne({ email });
      console.log("Existing user check result:", user);

      if (user) return res.status(400).json({ message: "User already exists" });

      // Add this logging
      console.log("Creating password hash...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Add this logging
      console.log("Creating new user...");
      user = new User({ name, email, password: hashedPassword, role });
      
      // Add this logging
      console.log("Saving user...");
      await user.save();

      console.log("User Registered Successfully:", user); 
      res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
      // Improve error logging
      console.error("Error in /register:", {
          message: err.message,
          stack: err.stack,
          name: err.name
      }); 
      return res.status(500).json({ 
          message: "Server error", 
          error: err.message  // Send more detailed error to client in development
      });
  }
});
  

// LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER DATA
router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
