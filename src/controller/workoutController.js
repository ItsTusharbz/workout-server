const { Workout } = require("../model/workoutModel");
const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");

const getWorkouts = async (req, res, next) => {
  const { bodyPartId } = req.params;
  const sqlquery = "SELECT * FROM `workouts` WHERE bodyPartId = ?";
  con.query(sqlquery, [bodyPartId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const addWorkout = async (req, res, next) => {
  const { name, bodyPartId } = req.body;
  console.log({ name, bodyPartId })
  const sqlquery = `Insert into workouts (name,bodyPartId) values (?,?)`;
  con.query(sqlquery, [name, bodyPartId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const removeWorkout = async (req, res, next) => {
  const id = req.params.wid;
  const sqlquery = "DELETE FROM workouts WHERE id = ?";
  con.query(sqlquery, [id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const updateWorkout = async (req, res, next) => {
  const { name } = req.body;
  const id = req.params.wid;
  const sqlquery = "UPDATE workouts SET name = ? where id = ?";
  con.query(sqlquery, [name, id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

exports.getWorkouts = getWorkouts;
exports.addWorkout = addWorkout;
exports.updateWorkout = updateWorkout;
exports.removeWorkout = removeWorkout;
