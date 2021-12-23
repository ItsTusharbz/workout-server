const { workoutDetailModel } = require("../model/workoutDetailModel");
const HttpError = require("../model/httpError");
const { exportData, prepareSummaryData } = require("../utils/util");
const { con } = require("../utils/db");

const getWorkoutsDetail = async (req, res, next) => {
  const workoutId = req.params.workoutId;
  const sqlquery =
    "SELECT GROUP_CONCAT(id) as id, GROUP_CONCAT(reps) as reps, GROUP_CONCAT(weight) as weight, GROUP_CONCAT(duration) as duration, createdOn FROM `workoutDetails` WHERE workoutId = ? Group By createdOn Order by createdOn DESC";
  con.query(sqlquery, [workoutId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      const responseData = result.map((workout) => ({
        createdOn: workout.createdOn,
        detail: prepareSummaryData({
          id: workout.id,
          reps: workout.reps,
          weight: workout.weight,
          duration: workout.duration,
        }),
      }));
      res.send(exportData(responseData));
    }
  });
};

const addWorkoutDetail = async (req, res, next) => {
  const { workoutId, reps, weight, duration } = req.body;
  console.log({ workoutId, reps, weight, duration });
  const sqlquery = `Insert into workoutDetails (workoutId,reps,weight,duration) values (?,?,?,?)`;
  con.query(sqlquery, [workoutId, reps, weight, duration], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const removeWorkoutDetail = async (req, res, next) => {
  const { workoutDetailId } = req.params;
  const sqlquery = "DELETE FROM workoutDetails WHERE id = ?";
  con.query(sqlquery, [workoutDetailId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const updateWorkoutDetail = async (req, res, next) => {
  const { workoutDetailId } = req.params;
  const { rep, weight, duration } = req.body;
  const id = req.params.wid;
  const sqlquery =
    "UPDATE workoutDetails SET rep = ?, weight = ?,duration = ? where id = ?";
  con.query(
    sqlquery,
    [rep, weight, duration, workoutDetailId],
    (err, result) => {
      if (err) {
        const error = new HttpError(err, 500);
        return next(error);
      } else {
        res.send(exportData(result));
      }
    }
  );
};

exports.getWorkoutsDetail = getWorkoutsDetail;
exports.addWorkoutDetail = addWorkoutDetail;
exports.updateWorkoutDetail = updateWorkoutDetail;
exports.removeWorkoutDetail = removeWorkoutDetail;
