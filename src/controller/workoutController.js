const { Workout } = require("../model/workoutModel");
const HttpError = require("../model/HttpError");
const { exportData } = require("../utils/Util");

const getWorkouts = async (req, res, next) => {
  try {
    const repsonse = await Workout.find({});
    res.send(exportData(repsonse));
  } catch (err) {
    const error = new HttpError("No workout found", 500);
    return next(error);
  }
};

const addWorkout = async (req, res, next) => {
  const workoutSchema = new Workout({
    ...req.body,
  });
  try {
    await workoutSchema.save();
    res.send(exportData(workoutSchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const removeWorkout = async (req, res, next) => {
  const id = req.params.wid;
  try {
    const workoutSchema = await Workout.findById(id);
    await workoutSchema.remove();
    res.send(exportData(workoutSchema));
  } catch (err) {
    const error = new HttpError("workout not found", 500);
    return next(error);
  }
};

const updateWorkout = async (req, res, next) => {
  const id = req.params.wid;
  const { name, rep, weight, bodyPart, duration, status, sets } = req.body;
  try {
    const workoutSchema = await Workout.findById(id);
    workoutSchema.name = name;
    workoutSchema.rep = rep;
    workoutSchema.weight = weight;
    workoutSchema.bodyPart = bodyPart;
    workoutSchema.duration = duration;
    workoutSchema.sets = sets;
    workoutSchema.status = status;
    await workoutSchema.save();
    res.send(exportData(workoutSchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

exports.getWorkouts = getWorkouts;
exports.addWorkout = addWorkout;
exports.updateWorkout = updateWorkout;
exports.removeWorkout = removeWorkout;
