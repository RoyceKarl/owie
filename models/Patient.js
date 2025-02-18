const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    region: {
      id: { type: String, required: false },
      regCode: { type: String, required: false },
      regDesc: { type: String, required: false },
      value: { type: String, required: false },
      label: { type: String, required: false },
    },
    province: {
      id: { type: String, required: false },
      provCode: { type: String, required: false },
      provDesc: { type: String, required: false },
      regCode: { type: String, required: false },
      value: { type: String, required: false },
      label: { type: String, required: false },
    },
    municipality: {
      id: { type: String, required: false },
      citymunCode: { type: String, required: false },
      citymunDesc: { type: String, required: false },
      provCode: { type: String, required: false },
      regCode: { type: String, required: false },
      value: { type: String, required: false },
      label: { type: String, required: false },
    },
    barangay: {
      id: { type: String, required: false },
      brgyCode: { type: String, required: false },
      brgyDesc: { type: String, required: false },
      citymunCode: { type: String, required: false },
      provCode: { type: String, required: false },
      regCode: { type: String, required: false },
      value: { type: String, required: false },
      label: { type: String, required: false },
    },
    address: { type: String, required: true },
    cNumber: { type: String, required: true },
    birthday: { type: Date, required: true },
    dataPrivacy: { type: Boolean, required: true },
    informationSheet: { type: String }, // Added field (can store a URL or file path)
    picture: { type: String }, // Added field (can store a URL or file path)
    registrationDetails: { type: String }, // Added field
    digitalSignature: { type: String }, // Added field (can store a URL or file path)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Patient", patientSchema);
