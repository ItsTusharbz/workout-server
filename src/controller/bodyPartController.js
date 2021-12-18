const { BodyPart } = require("../model/bodyPartModel");
const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");

const getBodyPartList = async (req, res, next) => {
  try {
    const repsonse = await BodyPart.find();
    res.send(exportData(repsonse));
  } catch (err) {
      console.log(err)
    const error = new HttpError("No body part list found", 500);
    return next(error);
  }
};

exports.getBodyPartList = getBodyPartList;