const HttpError = require("../model/httpError");
const { exportData, getToday, prepareSummaryData } = require("../utils/util");
const { con } = require("../utils/db");

const getSummaryByDate = async (req, res, next) => {
  const sqlquery =
    "SELECT GROUP_CONCAT(wd.id) as id, GROUP_CONCAT(wd.reps) as reps,GROUP_CONCAT(wd.weight) as weight, GROUP_CONCAT(wd.duration) as duration, w.name as workoutName, b.name as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE wd.createdOn = CURDATE() group by wd.workoutId";
  con.query(sqlquery, (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      const newResult = result.map((workout) => {
        return {
          bodyPartName: workout.bodyPartName,
          workoutName: workout.workoutName,
          detail: prepareSummaryData({
            id: workout.id,
            reps: workout.reps,
            weight: workout.weight,
            duration: workout.duration,
          }),
        };
      });
      res.send(exportData(newResult));
    }
  });
};

exports.getSummaryByDate = getSummaryByDate;
