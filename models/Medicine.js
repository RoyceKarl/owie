const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    inventoryOut: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
