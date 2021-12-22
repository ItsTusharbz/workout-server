const HttpError = require("../model/httpError");
const { exportData, getToday } = require("../utils/util");
const { con } = require("../utils/db");

const getSummaryByDate = async (req, res, next) => {
  const { date } = req.body;
  const sqlquery =
    "SELECT GROUP_CONCAT(wd.reps) as reps,GROUP_CONCAT(wd.weight) as weight, GROUP_CONCAT(wd.duration) as duration, w.name as workoutName, b.name as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE wd.createdOn = CURDATE() group by wd.workoutId";
  con.query(sqlquery, (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      // const expectedResult = result? result.reduce((a,b) => a.push(),[])
      res.send(exportData(result));
    }
  });
};

exports.getSummaryByDate = getSummaryByDate;
