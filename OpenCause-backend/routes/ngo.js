const express = require("express");
const router = express.Router();
const NGO = require("../models/NGO");

// Get all NGOs
router.get("/", async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: Add new NGO (admin only for now, no auth)
router.post("/", async (req, res) => {
  try {
    const { name, focus, location, registrationNumber, website, contactEmail, contactPhone } = req.body;
    const newNGO = new NGO({ name, focus, location, registrationNumber, website, contactEmail, contactPhone });
    await newNGO.save();
    res.status(201).json({ message: "NGO added successfully", ngo: newNGO });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
