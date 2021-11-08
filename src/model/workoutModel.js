const mongoose = require("mongoose");

const Workout = mongoose.Schema({
  name: { type: String, default: "" },
  reps: { type: Number, default: 0 },
  sets: { type: Number, default: 0 },
  bodyPart: { type: String, default: "" },
  weight: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  //   dayId: { type:mongoose.Types.ObjectId, required: true, ref:'Day' },
  createdOn: { type: Date, default: Date.now() },
});

exports.Workout = mongoose.model("Workout", Workout);
