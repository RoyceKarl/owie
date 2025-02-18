const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "SuperAdmin",
      "Admin",
      "Driver",
      "HealthDispatcher",
      "Mechanic",
      "Dispatcher",
    ],
    required: true,
  },
  firstName: {
    type: String,
    required: function () {
      return ["Driver", "Dispatcher", "HealthDispatcher"].includes(this.role);
    },
  },
  lastName: {
    type: String,
    required: function () {
      return ["Driver", "Dispatcher", "HealthDispatcher"].includes(this.role);
    },
  },
  company: {
    type: String,
    required: function () {
      return ["Driver", "Dispatcher", "HealthDispatcher"].includes(this.role);
    },
  },
  licenseNumber: {
    type: String,
    required: function () {
      return this.role === "Driver";
    },
  },
  medicalLicenseNumber: {
    type: String,
    required: function () {
      return this.role === "HealthDispatcher";
    },
  },
  certificationNumber: {
    type: String,
    required: function () {
      return this.role === "Mechanic";
    },
  },
  name: {
    type: String,
    required: function () {
      return !["Driver", "Dispatcher", "HealthDispatcher", "Mechanic"].includes(
        this.role
      );
    },
  },
  contactInfo: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
