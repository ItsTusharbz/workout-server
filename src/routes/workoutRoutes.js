const express = require("express");
const Router = express.Router();

const workoutController = require("../controller/workoutController")

Router.get("/:bodyPartId", workoutController.getWorkouts);
Router.post("/", workoutController.addWorkout);
Router.put("/:wid", workoutController.updateWorkout);
Router.delete("/:wid", workoutController.removeWorkout);

module.exports = Router;
