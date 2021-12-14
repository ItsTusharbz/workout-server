const mongoose = require("mongoose");

const workoutDetailModel = mongoose.Schema({
  workoutId: { type: mongoose.Types.ObjectId, required: true, ref: "workout" },
  reps: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  createdOn: { type: Date, default: Date.now() },
});

exports.workoutDetailModel = mongoose.model("WorkoutDetail", workoutDetailModel);
