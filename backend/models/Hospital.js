const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  bloodAvailable: {
    type: Map,
    of: Number, // Example: { "A+": 5, "B+": 2 }
    default: {},
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
