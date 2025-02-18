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

module.exports = router;
