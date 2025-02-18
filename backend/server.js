const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from frontend (Vite runs on port 5173)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // Ensure Express parses JSON requests

// Import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
