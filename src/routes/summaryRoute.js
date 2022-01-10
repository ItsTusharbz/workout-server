const express = require("express");
const Router = express.Router();

const summaryController = require("../controller/summaryController");

Router.post("/", summaryController.getSummaryByDate);
Router.post("/history", summaryController.getHistorySummary);

module.exports = Router;
