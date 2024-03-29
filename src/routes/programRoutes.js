const express = require("express");
const programController = require("../controller/programController");
const Router = express.Router();

Router.post("/", programController.saveProgramName);
Router.post("/:pId", programController.saveProgramDetail);
Router.get("/:pId", programController.getProgramDetail);
Router.get("/", programController.getPrograms);
Router.patch("/:pId", programController.UpdateProgram);

// program workout detail routes
Router.post("/:pId/:wbId", programController.AddProgramWorkoutDetail);
Router.get("/:pId/:wbId", programController.getProgramsWorkoutDetail);

module.exports = Router;
