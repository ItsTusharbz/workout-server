const mongoose = require("mongoose");

const Workout = mongoose.Schema({
  name: String,
  rep: Number,
  bodyPart: String,
  weight: Number,
  duration: Number,
  status: { type: Boolean, default: true },
//   dayId: { type:mongoose.Types.ObjectId, required: true, ref:'Day' },
  createdOn: { type: Date, default: Date.now() },
});

exports.Workout = mongoose.model("Workout", Workout);
