const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Donation", donationSchema);
