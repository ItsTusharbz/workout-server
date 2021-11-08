const { Day } = require("../Model/DayModel");
const HttpError = require("../Model/HttpError");
const { exportData } = require("../Utils/Util");

const getDay = async (req, res, next) => {
  try {
    const repsonse = await Day.find({});
    res.send(exportData(repsonse));
  } catch (err) {
    const error = new HttpError("No day found", 500);
    return next(error);
  }
};

const addDay = async (req, res, next) => {
  const DaySchema = new Day({
    ...req.body,
  });
  try {
    await DaySchema.save();
    res.send(exportData(DaySchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const updateDay = async (req, res, next) => {
  const id = req.params.did;
  const { name, isActive } = req.body;
  try {
    const DaySchema = await Day.findById(id);
    DaySchema.name = name;
    DaySchema.isActive = isActive;
    await DaySchema.save();
    res.send(exportData(DaySchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const removeDay = async (req, res, next) => {
  const id = req.params.did;
  try {
    const DaySchema = await Day.findById(id);
    await DaySchema.remove();
    res.send(exportData(DaySchema));
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
};

exports.getDay = getDay;
exports.addDay = addDay;
exports.updateDay = updateDay;
exports.removeDay = removeDay;
