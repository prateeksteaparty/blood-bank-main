const mongoose = require('mongoose');

// Define the hospital schema
const hospitalSchema = new mongoose.Schema({
  name: String,
  location: String,
  bloodAvailable: {
    "A+": Number,
    "A-": Number,
    "B+": Number,
    "B-": Number,
    "O+": Number,
    "O-": Number,
    "AB+": Number,
    "AB-": Number,
  },
});

// Create the model based on the schema
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;  // Ensure this is properly exported
