const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  location: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  website: String,
  contactEmail: String,
  contactPhone: String
});

module.exports = mongoose.model("NGO", NGOSchema);

