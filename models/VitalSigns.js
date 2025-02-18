const mongoose = require("mongoose");

const vitalSignsSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    temperature: { type: Number, required: true },
    pulseRate: { type: Number, required: true },
    respirationRate: { type: Number, required: true },
    bloodPressure: { type: String, required: true }, // e.g., "120/80"
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("VitalSigns", vitalSignsSchema);
