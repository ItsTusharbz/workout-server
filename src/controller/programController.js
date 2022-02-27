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

  const sqlquery = `SELECT pd.id as wbId, bp.name as bodyPartName, w.name as workoutName FROM programDetail as pd JOIN bodyParts as bp ON pd.bodyPartId = bp.id JOIN workouts as w on pd.workoutId = w.id where pd.userId = ? and pd.programId= ?`;
  con.query(sqlquery, [id, programId], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const getPrograms = async (req, res, next) => {
  const { id } = req.user;

  const sqlquery = `SELECT id,name from programs where userId = ?`;
  con.query(sqlquery, [id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const UpdateProgramName = async (programId, name, next) => {
  const sqlquery = `Update programs set name = ? where id = ?`;
  return new Promise((resolve, reject) => {
    con.query(sqlquery, [name, programId], (err, result) => {
      console.log(result);
      if (err) {
        reject(new HttpError(err, 500));
      } else {
        resolve(result);
      }
    });
  });
};

const UpdateProgram = async (req, res, next) => {
  const programId = req.params.pId;
  const payload = req.body;
  console.log(programId, payload);
  const sqlquery = `Update programs set name = ? where id = ?`;
  con.query(sqlquery, [id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};

const AddProgramWorkoutDetail = async (req, res, next) => {
  const programId = req.params.pId;
  const wbId = req.params.wbId;
  const payload = req.body;
  const { id } = req.user;

  const { weight, reps, duration } = payload;

  const sqlquery = `Insert into programWorkoutDetail (programId, programDetail_Id, weight, repetition, duration, userId) values (?,?,?,?,?,?)`;
  con.query(
    sqlquery,
    [programId, wbId, weight, reps, duration, id],
    (err, result) => {
      if (err) {
        const error = new HttpError(err, 500);
        return next(error);
      } else {
        res.send(exportData("Successfully added workout detail"));
      }
    }
  );
};

const getProgramsWorkoutDetail = async (req, res, next) => {
  const programId = req.params.pId;
  const wbId = req.params.wbId;
  const { id } = req.user;

  const sqlquery = `SELECT weight,repetition,duration,createdOn from programWorkoutDetail where  programId =? and programDetail_Id=? and userId = ? order by createdOn desc`;
  con.query(sqlquery, [programId, wbId, id], (err, result) => {
    if (err) {
      const error = new HttpError(err, 500);
      return next(error);
    } else {
      res.send(exportData(result));
    }
  });
};


exports.saveProgramName = saveProgramName;
exports.getPrograms = getPrograms;
exports.saveProgramDetail = saveProgramDetail;
exports.getProgramDetail = getProgramDetail;
exports.UpdateProgram = UpdateProgram;
exports.AddProgramWorkoutDetail = AddProgramWorkoutDetail;
exports.getProgramsWorkoutDetail = getProgramsWorkoutDetail;
