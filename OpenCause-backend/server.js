const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== API routes =====
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ngos", require("./routes/ngo"));
app.use("/api/donations", require("./routes/donation"));

// ===== Root route (for testing / live URL) =====
app.get("/", (req, res) => {
  res.send("OpenCause backend is running!");
});

// ===== Connect to MongoDB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

