const { Workout } = require("../model/workoutModel");
const HttpError = require("../model/httpError");
const { exportData, exportError } = require("../utils/util");
const { con } = require("../utils/db");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const getWorkoutDetail = async (req, res, next) => {
  const { id } = req.user;
  const {wid} = req.params;
  try{
    const exerciseList = await client.workoutExerciseRelation.findMany({
      where: {
        workoutId : parseInt(wid),
        
      },
      orderBy: {
        createdOn: "asc"
      }
    })
  res.send(exportData(exerciseList));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const addWorkout = async (req, res, next) => {
  const { pid } = req.params;
  const { name } = req.body;
  const { id } = req.user;
  try{
    await client.workout.create({
      data: {
        name,
        programId: parseInt(pid),
        userId: id,
      }
    })
    res.send(exportData("Workout added successfully"));
  }catch(err){
    const error = new HttpError(err, 500);
      return next(error);
  }
};

const removeWorkout = async (req, res, next) => {
  const id = req.params.wid;
  try{
    await client.workout.delete({
      where:{
        id: wid
      }
    })
    return next(error);
  }catch(err){
    res.send(exportData(result));
    const error = new HttpError(err, 500);
  }
};

const updateWorkout = async (req, res, next) => {
  const { name } = req.body;
  const { wid } = req.params;
  try{
    await client.workout.update({
      where:{
        id: parseInt(wid)
      },
      data: {
        name
      }
    })
    res.send(exportData("Workout is updated successfully"));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};

exports.getWorkoutDetail = getWorkoutDetail;
exports.addWorkout = addWorkout;
exports.updateWorkout = updateWorkout;
exports.removeWorkout = removeWorkout;
