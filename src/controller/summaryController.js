const HttpError = require("../model/httpError");
const { exportData, getToday, prepareSummaryData } = require("../utils/util");
const { con } = require("../utils/db");
const { formatDate } = require("../utils/util");
const moment = require("moment");

const getSummaryByDate = async (req, res, next) => {
  const { date } = req.body;
  const { id } = req.user;
  let compareDate = null;
  console.log(date)
  if (date) {
    compareDate = `wd.createdOn = "${date}"`;
  } else {
    compareDate = "wd.createdOn = CURDATE()";
  }
  const sqlquery =
    "SELECT DISTINCT(wd.createdOn) as createdOn, GROUP_CONCAT(wd.id) as id, GROUP_CONCAT(wd.reps) as reps,GROUP_CONCAT(wd.weight) as weight, GROUP_CONCAT(wd.duration) as duration, w.name as workoutName, b.name as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE " +
    compareDate +
    " and wd.userId=?" +
    " group by wd.workoutId";
  console.log(sqlquery);
  con.query(sqlquery, [id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      const newResult = result.map((workout) => {
        return {
          bodyPartName: workout.bodyPartName,
          workoutName: workout.workoutName,
          createdOn: formatDate(workout.createdOn),
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
  const { id } = req.user;
  const compareDate = `(wd.createdOn BETWEEN '${start}' AND '${end}')`;
  const sqlquery =
    "SELECT wd.createdOn as createdOn, w.name as workoutName,b.name as bodyPartName FROM `workoutDetails` as wd join workouts as w ON workoutId = w.id join bodyParts as b ON w.bodyPartId = b.id WHERE" +
    compareDate +
    " and wd.userId=? ORDER by b.name";
  console.log(sqlquery);
  con.query(sqlquery, [id], (err, result) => {
    if (result) {
      const newArray = [];
      result.map((entry, index) => {
        const foundindex = newArray.findIndex((a) => {
          return moment(a.createdOn).isSame(moment(entry.createdOn));
        });
        if (foundindex === -1) {
          newArray.push({
            createdOn: formatDate(entry.createdOn),
            detail: [
              {
                bodyPartName: entry.bodyPartName,
                workoutName: entry.workoutName,
              },
            ],
          });
        } else {
          newArray[foundindex].detail.push({
            bodyPartName: entry.bodyPartName,
            workoutName: entry.workoutName,
          });
        }
      });

      res.send(exportData(newArray));
    } else {
      res.send(exportData([]));
    }
  });
};

exports.getSummaryByDate = getSummaryByDate;
exports.getHistorySummary = getHistorySummary;
