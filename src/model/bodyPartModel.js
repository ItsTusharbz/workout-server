const mongoose = require("mongoose");

const BodyPart = mongoose.Schema({
  name: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now() },
});

exports.BodyPart = mongoose.model("BodyPart", BodyPart);
