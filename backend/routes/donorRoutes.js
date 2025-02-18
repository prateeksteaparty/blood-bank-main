const express = require("express");
const Donor = require("../models/Donor");

const router = express.Router();

// Register a new donor
router.post("/register", async (req, res) => {
  try {
    const { name, bloodGroup, city, contact, lastDonationDate } = req.body;
    if (!name || !bloodGroup || !city || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDonor = new Donor({ name, bloodGroup, city, contact, lastDonationDate });
    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch donors by blood group and city
router.get("/search", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required" });
    }

    const donors = await Donor.find({ bloodGroup, city });
    res.json(donors);
  } catch (err) {
    console.error("Error in /search:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
