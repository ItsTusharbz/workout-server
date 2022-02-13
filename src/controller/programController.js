const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");

const saveProgramName = async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;

  const sqlquery = `Insert into programs (name,userId) values (?,?)`;
  con.query(sqlquery, [name, id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData("Program added successfully"));
    }
  });
};

const saveProgramDetail = async (req, res, next) => {
  const { id } = req.user;
  const programId = req.params.pId;
  const { bodyPartId, workoutId } = req.body;

  const sqlquery = `Insert into programDetail (programId,bodyPartId,workoutId,userId) values (?,?,?,?)`;
  con.query(sqlquery, [programId, bodyPartId, workoutId, id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData("Program detail added successfully"));
    }
  });
};

const getProgramDetail = async (req, res, next) => {
  const { id } = req.user;
  const programId = req.params.pId;

  const sqlquery = `SELECT bp.name as bodyPartName, w.name as workoutName FROM programDetail as pd JOIN bodyParts as bp ON pd.bodyPartId = bp.id JOIN workouts as w on pd.workoutId = w.id where pd.userId = ? and pd.programId= ?`;
  con.query(sqlquery, [id, programId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

exports.saveProgramName = saveProgramName;
exports.saveProgramDetail = saveProgramDetail;
exports.getProgramDetail = getProgramDetail;
