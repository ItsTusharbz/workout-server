const { workoutDetailModel } = require("../model/workoutDetailModel");
const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");

const getWorkoutsDetail = async (req, res, next) => {
  const workoutId = req.params.workoutId;
  try {
    const repsonse = await workoutDetailModel.find({ workoutId: workoutId });
    res.send(exportData(repsonse));
  } catch (err) {
    const error = new HttpError("No workout detail found", 500);
    return next(error);
  }
};

const addWorkoutDetail = async (req, res, next) => {
  const workoutSchema = new workoutDetailModel({
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

const removeWorkoutDetail = async (req, res, next) => {
  const { workoutDetailId } = req.params;
  try {
    const workoutSchema = await workoutDetailModel.findById(workoutDetailId);
    await workoutSchema.remove();
    res.send(exportData(workoutSchema));
  } catch (err) {
    const error = new HttpError("workout detail not found", 500);
    return next(error);
  }
};

const updateWorkoutDetail = async (req, res, next) => {
  const { workoutDetailId } = req.params;
  const { name, rep, weight, bodyPart, duration, status, sets } = req.body;
  try {
    const workoutSchema = await workoutDetailModel.findById(workoutDetailId);
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

exports.getWorkoutsDetail = getWorkoutsDetail;
exports.addWorkoutDetail = addWorkoutDetail;
exports.updateWorkoutDetail = updateWorkoutDetail;
exports.removeWorkoutDetail = removeWorkoutDetail;
