const express = require("express");
const Router = express.Router();

const summaryController = require("../controller/summaryController");

Router.post("/:userId", summaryController.getSummaryByDate);

module.exports = Router;
