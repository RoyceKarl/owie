const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
      required: true,
    },
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    testTypes: {
      type: [String], // Array of strings to store multiple test types
      required: true,
      validate: {
        validator: (value) => value.length > 0, // Ensure at least one test type is provided
        message: "At least one test type is required",
      },
    },
    results: {
      type: [String], // Optional: Store results for each test type
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("LabTest", labTestSchema);
