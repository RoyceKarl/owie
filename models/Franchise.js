const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  franchiseID: { type: String, required: true, unique: true },
  caseNo: { type: String, required: true, unique: true },
  numberOfAuthorizedUnits: { type: Number, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  fleetManager: { type: String, required: true },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RouteMaker",
    required: true,
  },
  dateGranted: { type: Date, required: true },
  dateExpired: { type: Date, required: true },
  remarks: { type: String },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Franchise", franchiseSchema);
