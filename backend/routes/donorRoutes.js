const express = require("express");
const Donor = require("../models/Donor"); 
const router = express.Router();

// Register a new donor
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, city, availability } = req.body;
    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required" });
    }

    const newDonor = new Donor({
      bloodGroup,
      city,
      availability,
    });

    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    console.error("Error in /api/donors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch donors by blood group and city
// Fetch donors by blood group and city (case-insensitive)
// Fetch donors by blood group and city (case-insensitive)
// Fetch donors by blood group and city (case-insensitive)
router.get("/", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    console.log("Received query parameters:", { bloodGroup, city });  // Log parameters

    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required" });
    }

    // Log the query sent to MongoDB
    console.log("Querying MongoDB:", { bloodGroup, city });

    const donors = await Donor.find({
      bloodGroup: { $regex: new RegExp(bloodGroup, "i") },  // case-insensitive
      city: { $regex: new RegExp(city, "i") }  // case-insensitive
    });

    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    res.json(donors);
  } catch (err) {
    console.error("Error in /api/donors:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




module.exports = router;
