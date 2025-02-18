const mongoose = require("mongoose");

const routeMakerSchema = new mongoose.Schema({
  routeMakerID: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  routeLength: { type: Number, required: true },
  authorizedMode: {
    type: String,
    enum: ["Class 1 PUJ", "Class 2 PUJ", "Class 3 PUJ"],
    required: true,
  },
  numberOfAuthorizedUnits: { type: Number, required: true },
  typeOfService: {
    type: String,
    enum: [
      "PUB - Non-Aircon",
      "PUB - Aircon",
      "PUJ - Traditional",
      "PUJ - Modernized (N/A)",
      "PUJ - Modernized (AC)",
      "UV",
    ],
    required: true,
  },
  numberOfStations: { type: Number, required: true },
  minFare: { type: Number, required: true },
  distanceLimitFare: { type: Number, required: true },
  succeedingDistance: { type: Number, required: true },
  succeedingDistanceFare: { type: Number, required: true },
});

module.exports = mongoose.model("RouteMaker", routeMakerSchema);
