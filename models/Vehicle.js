const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  series: { type: String, required: true },
  yearModel: { type: Number, required: true },
  passengerCapacity: { type: Number, required: true },
  bodyType: { type: String, required: true },
  engineModel: { type: String, required: true },
  engineDisplacement: { type: String, required: true },
  enginePowerTorque: { type: String, required: true },
  overallLength: { type: Number, required: true }, // in meters
  overallWidth: { type: Number, required: true }, // in meters
  overallHeight: { type: Number, required: true }, // in meters
  wheelbase: { type: Number, required: true },
  frontThread: { type: String, required: true },
  rearThread: { type: String, required: true },
  frontOverhang: { type: String, required: true },
  grossVehicleWeight: { type: Number, required: true }, // in kgs
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
