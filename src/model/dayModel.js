const mongoose = require("mongoose");

const Day = mongoose.Schema({
  name: String,
  isActive: { type: Boolean, default: true },
  // weekId: { type: mongoose.Types.ObjectId, required: true, ref: "Week" },
  createdOn: { type: Date, default: Date.now() },
});

exports.Day = mongoose.model("Day", Day);
