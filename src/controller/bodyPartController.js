const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");

const getBodyPartList = async (req, res, next) => {
  const query = "SELECT * FROM `bodyParts` WHERE 1";
  let repsonse = [];
  con.query(query, (err, result) => {
    if (err) {
      console.log(err);
      const error = new HttpError("No body part list found", 500);
      return next(error);
    }
    repsonse = result;
    res.send(exportData(repsonse));
  });
};

exports.getBodyPartList = getBodyPartList;
