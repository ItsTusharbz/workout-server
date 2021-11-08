const express = require("express");
const Router = express.Router();

const weekController = require("../controller/weekController")

Router.get("/", weekController.getWeek);
Router.post("/", weekController.addWeek);
Router.put("/:wid", weekController.updateWeek);
Router.delete("/:wid", weekController.removeWeek);

module.exports = Router;
