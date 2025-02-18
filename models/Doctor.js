const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorDetails: { type: String, required: true },
    doctorSignature: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
