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
      const newResult = result.map((a) => {
        const detail = [];
        let i = 0;
        const repsArray = a.reps.split(",");
        const weightArray = a.weight.split(",");
        const durationArray = a.duration.split(",");
        while (i < repsArray.length) {
          detail.push({
            reps: repsArray[i] ? repsArray[i] : null,
            weight: weightArray[i] ? weightArray[i] : null,
            duratioin: durationArray[i] ? durationArray[i] : null,
          }),
            i++;
        }
        return {
          bodyPartName: a.bodyPartName,
          workoutName: a.workoutName,
          detail,
        };
      });
      res.send(exportData(newResult));
    }
  });
};

exports.getSummaryByDate = getSummaryByDate;
