const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Add hospital details
router.post("/add", async (req, res) => {
  try {
    const { name, location, bloodAvailable } = req.body;

    if (!name || !location || !bloodAvailable) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hospital = new Hospital({ name, location, bloodAvailable });
    await hospital.save();

    res.status(201).json({ message: "Hospital added successfully" });
  } catch (err) {
    console.error("Error in /add:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all hospitals
router.get("/all", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Search hospitals by location
router.get("/search", async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ message: "Location query parameter is required" });
    }

    // Perform case-insensitive search using regex
    const hospitals = await Hospital.find({ location: new RegExp(location, "i") });

    if (hospitals.length === 0) {
      return res.status(404).json({ message: "No hospitals found for the given location" });
    }

    res.json(hospitals);
  } catch (err) {
    console.error("Error in /search:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
