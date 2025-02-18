const express = require("express");
const cors = require("cors");
const connectDB = require('./db'); // Import the database connection

const app = express();

// Connect to MongoDB first
connectDB()
  .then(() => {
    // Only set up routes and start server after DB connection is established
    
    // Middleware
    app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    app.use(express.json());

    // Import routes
    const authRoutes = require("./routes/authRoutes");
    const donorRoutes = require("./routes/donorRoutes");
    const hospitalRoutes = require("./routes/hospitalRoutes");  // Import hospital routes

    // Route middleware
    app.use("/api/auth", authRoutes);
    app.use("/api/donors", donorRoutes);
    app.use("/api/hospitals", hospitalRoutes);  // Add the hospitals route

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});
