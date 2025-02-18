const mongoose = require("mongoose");

const endorsementSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProvider",
      required: true,
    },
    endorsementDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Endorsement", endorsementSchema);
