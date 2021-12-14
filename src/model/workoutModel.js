const mongoose = require("mongoose");

const Workout = mongoose.Schema({
  name: { type: String, default: "" },
  bodyPartId: { type: mongoose.Types.ObjectId, required: true, ref: "BodyPart" },
  createdOn: { type: Date, default: Date.now() },
});

exports.Workout = mongoose.model("Workout", Workout);
