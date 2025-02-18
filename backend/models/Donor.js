const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  availability: { type: Boolean, default: true },  // To track availability
});

module.exports = mongoose.model("Donor", DonorSchema);
