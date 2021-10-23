const { Week } = require("../model/weekModel");
const HttpError = require("../model/HttpError");
const { exportData } = require("../utils/util");

const getWeek = async (req, res, next) => {
  try {
    const repsonse = await Week.find({});
    res.send(exportData(repsonse));
  } catch (err) {
    const error = new HttpError("No Week found", 500);
    return next(error);
  }
};

const addWeek = async (req, res, next) => {
  const WeekSchema = new Week({
    ...req.body,
  });
  try {
    await WeekSchema.save();
    res.send(exportData(WeekSchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const updateWeek = async (req, res, next) => {
  const id = req.params.wid;
  const { name, isActive } = req.body;
  try {
    const WeekSchema = await Week.findById(id);
    WeekSchema.name = name;
    WeekSchema.isActive = isActive;
    await WeekSchema.save();
    res.send(exportData(WeekSchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const removeWeek = async (req, res, next) => {
  const id = req.params.wid;
  try {
    const WeekSchema = await Week.findById(id);
    await WeekSchema.remove();
    res.send(exportData(WeekSchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

exports.getWeek = getWeek;
exports.addWeek = addWeek;
exports.updateWeek = updateWeek;
exports.removeWeek = removeWeek;
