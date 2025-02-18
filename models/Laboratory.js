const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema(
  {
    labName: { type: String, required: true },
    laboratoryChecklist: { type: [String] }, // Array of checklist items
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Laboratory", laboratorySchema);
