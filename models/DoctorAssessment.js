const mongoose = require("mongoose");

const doctorAssessmentSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    doctorImpression: { type: String, required: true },
    doctorRemarks: { type: String },
    doctorOrder: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("DoctorAssessment", doctorAssessmentSchema);
