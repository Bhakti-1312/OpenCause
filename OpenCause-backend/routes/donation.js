const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Submit a donation
router.post("/", async (req, res) => {
  try {
    const { user, ngo, amount } = req.body;
    const donation = await Donation.create({ user, ngo, amount });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
