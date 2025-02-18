const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    registrationDate: { type: Date, default: Date.now },
    digitalSignature: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
