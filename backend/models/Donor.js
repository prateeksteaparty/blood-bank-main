const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  lastDonationDate: { type: Date, default: null },
});

module.exports = mongoose.model("Donor", DonorSchema);
