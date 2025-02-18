const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyID: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  tradeName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  zipCode: { type: String, required: true },
  companyLandline: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyMobile: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactPersonEmail: { type: String, required: true },
  contactPersonMobile: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Company", companySchema);
