const mongoose = require("mongoose");
// In your User model (models/User.js)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["donor", "hospital"], required: true },
});

// Remove the pre-save hook entirely
module.exports = mongoose.model("User", UserSchema);
