const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use("/api/auth", authRoutes);  // ✅ This fixes 404 error

module.exports = app;
