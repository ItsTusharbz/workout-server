const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");
const { PrismaClient, Status } = require("@prisma/client");

const client = new PrismaClient();

const saveProgram = async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;
  try{
    await client.program.create({
      data:{
        name,
        userId: id,
      }
    })
    res.send(exportData("Program added successfully"));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const getPrograms = async (req, res, next) => {
  const { id } = req.user;
  try{
    const result = await client.program.findMany({
      where: {
        userId: id,
        status: Status.Active
      }
    });
  res.send(exportData(result));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};

const UpdateProgram = async (req, res, next) => {
  const programId = req.params.pId;
  const payload = req.body;
  try{
    const result = await client.program.update({
      where: {
        id : parseInt(programId)
      },
      data:payload
    })
    res.send(exportData(result));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};


const deleteProgram = async (req, res, next) => {
  const pid = req.params.pId;
  const { id } = req.user;
  try{
    const result = await client.program.update({
      where: {
        id : parseInt(pid),
        userId: id
      },
      data: {
        status: Status.Inactive
      }
    })
    res.send(exportData("Successfully deleted program"));
  }catch(err){
    const error = new HttpError(err, 500);
    return next(error);
  }
};


exports.UpdateProgram = UpdateProgram;
exports.saveProgram = saveProgram;
exports.getPrograms = getPrograms;
exports.deleteProgram = deleteProgram;
