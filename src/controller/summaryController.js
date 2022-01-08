const HttpError = require("../model/httpError");
const { exportData, getToday, prepareSummaryData } = require("../utils/util");
const { con } = require("../utils/db");

const getSummaryByDate = async (req, res, next) => {
  const { date } = req.body;
  let compareDate = null;
  if (date) {
    compareDate = `wd.createdOn = "${date}"`;
  } else {
    compareDate = "wd.createdOn = CURDATE()";
  }
  const sqlquery =
    "SELECT DISTINCT(wd.createdOn) as createdOn, GROUP_CONCAT(wd.id) as id, GROUP_CONCAT(wd.reps) as reps,GROUP_CONCAT(wd.weight) as weight, GROUP_CONCAT(wd.duration) as duration, w.name as workoutName, b.name as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE " +
    compareDate +
    " group by wd.workoutId";
  con.query(sqlquery, (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      const newResult = result.map((workout) => {
        return {
          bodyPartName: workout.bodyPartName,
          workoutName: workout.workoutName,
          createdOn: workout.createdOn,
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

const getHistorySummary = (req, res, next) => {
  const { start, end } = req.body;
  const compareDate = `(wd.createdOn BETWEEN '${start}' AND '${end}')`;
  const sqlquery =
    "SELECT DISTINCT(wd.createdOn) as createdOn, GROUP_CONCAT(DISTINCT(w.name)) as workoutName, GROUP_CONCAT(DISTINCT(b.name)) as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE" +
    compareDate +
    " group by wd.createdOn";
  console.log(sqlquery);
  con.query(sqlquery, (err, result) => {
    res.send(exportData(result));
  });
};

exports.getSummaryByDate = getSummaryByDate;
exports.getHistorySummary = getHistorySummary;
