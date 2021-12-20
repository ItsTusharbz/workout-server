const mongoose = require("mongoose");
const { getToday } = require("../utils/util");

const today = getToday();

const workoutDetailModel = mongoose.Schema({
  workoutId: { type: mongoose.Types.ObjectId, required: true, ref: "Workout" },
  reps: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  createdOn: { type: String, default: today },
});

exports.workoutDetailModel = mongoose.model(
  "WorkoutDetail",
  workoutDetailModel
);
