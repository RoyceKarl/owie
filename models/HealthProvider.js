const mongoose = require("mongoose");

const healthProviderSchema = new mongoose.Schema(
  {
    providerName: { type: String, required: true },
    endorsementDetails: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("HealthProvider", healthProviderSchema);
