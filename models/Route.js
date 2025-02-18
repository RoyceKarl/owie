const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeID: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  routeClassification: {
    type: String,
    enum: ["Existing", "New/Developmental"],
    required: true,
  },
  mode: {
    type: String,
    enum: ["TPUJ", "MPUJ", "UVE", "PUB", "MiniBus"],
    required: true,
  },
  structure: { type: String, required: true },
  numberOfUnits: { type: Number, required: true },
  length: { type: Number, required: true },
  region: { type: String, required: true },
  province: { type: String, required: true },
  municipality: { type: String, required: true },
  dateApproved: { type: Date, required: true },
  dateExpired: { type: Date, required: true },
});

module.exports = mongoose.model("Route", routeSchema);
