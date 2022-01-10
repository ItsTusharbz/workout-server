const { Workout } = require("../model/workoutModel");
const HttpError = require("../model/httpError");
const { exportData, exportError } = require("../utils/util");
const { con } = require("../utils/db");

const getWorkouts = async (req, res, next) => {
  const { bodyPartId } = req.params;
  const { id } = req.user;
  const sqlquery =
    "SELECT * FROM `workouts` where (origin = ? or userId =?) and bodyPartId=?";
    con.query(sqlquery, ["system", id, bodyPartId], (err, result) => {
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
  const { id } = req.user;
  const origin = "user";
  const existisQuery = "Select * from workouts where name = ? ";
  con.query(existisQuery, [name], (err, result) => {
    console.log(result);
    if (!result.length) {
      const sqlquery = `Insert into workouts (name,bodyPartId,userId, origin) values (?,?,?,?)`;
      con.query(sqlquery, [name, bodyPartId, id, origin], (err, result) => {
        if (err) {
          const error = new HttpError(err, 500);
          return next(error);
        } else {
          res.send(exportData("workout added successfully"));
        }
      });
    } else {
      res.send(exportError("workout already exists", 400));
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
