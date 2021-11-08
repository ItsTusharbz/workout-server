const express = require("express");
const Router = express.Router();

const dayController = require("../Controller/DayController")

Router.get("/", dayController.getDay);
Router.post("/", dayController.addDay);
Router.put("/:did", dayController.updateDay);
Router.delete("/:did", dayController.removeDay);

module.exports = Router;
