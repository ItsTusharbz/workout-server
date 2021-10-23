const mongoose = require("mongoose");

const Week = mongoose.Schema({
  name: String,
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now() },
});

exports.Week = mongoose.model("Week", Week);
