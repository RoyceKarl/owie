const mongoose = require("mongoose");
const User = require("./User");

const superAdminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    systemEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SystemEvent" },
    ], // Logs system-wide events
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
