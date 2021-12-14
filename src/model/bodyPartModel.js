const mongoose = require("mongoose");

const BodyPart = mongoose.Schema({
  name: { type: String, default: "" },
//   bodyPartId: { type: mongoose.Types.ObjectId, required: true, ref: "BodyPart" },
  createdOn: { type: Date, default: Date.now() },
});

exports.BodyPart = mongoose.model("BodyPart", BodyPart);
