const { workoutDetailModel } = require("../model/workoutDetailModel");
const HttpError = require("../model/httpError");
const { exportData, prepareSummaryData } = require("../utils/util");
const { con } = require("../utils/db");

const getWorkoutsDetail = async (req, res, next) => {
  const workoutId = req.params.workoutId;
  const { id } = req.user;
  const sqlquery =
    "SELECT GROUP_CONCAT(id) as id, GROUP_CONCAT(reps) as reps, GROUP_CONCAT(weight) as weight, GROUP_CONCAT(duration) as duration, createdOn, GROUP_CONCAT(status) as status FROM `workoutDetails` WHERE workoutId = ? and userId = ? Group By createdOn Order by createdOn DESC";
  con.query(sqlquery, [workoutId, id], (err, result) => {
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
          status: workout.status,
        }),
      }));
      res.send(exportData(responseData));
    }
  });
};

const addWorkoutDetail = async (req, res, next) => {
  const { workoutId, reps, weight, duration, status } = req.body;
  const { id } = req.user;
  const sqlquery = `Insert into workoutDetails (workoutId,reps,weight,duration,userId,status) values (?,?,?,?,?,?)`;
  con.query(
    sqlquery,
    [workoutId, reps, weight, duration, id, status],
    (err, result) => {
      if (err) {
        const error = new HttpError(err, 500);
        return next(error);
      } else {
        res.send(exportData("Workout added successfully"));
      }
    }
  );
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

const updateWorkoutDetailStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.user;
  const wid = req.params.workoutDetailId;
  const sqlquery = `UPDATE workoutDetails SET status = ? where id = ? and userId = ?`;
  con.query(sqlquery, [status, wid, id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData("Workout updated successfully"));
    }
  });
};

exports.getWorkoutsDetail = getWorkoutsDetail;
exports.addWorkoutDetail = addWorkoutDetail;
exports.updateWorkoutDetail = updateWorkoutDetail;
exports.removeWorkoutDetail = removeWorkoutDetail;
exports.updateWorkoutDetailStatus = updateWorkoutDetailStatus;
