const express = require("express");
const programController = require("../controller/programController");
const Router = express.Router();

Router.post("/", programController.saveProgramName);
Router.post("/:pId", programController.saveProgramDetail);
Router.get("/:pId", programController.getProgramDetail);

module.exports = Router;
