const express = require("express");
const Router = express.Router();

const workoutController = require("../controller/workoutController")

Router.get("/:wid", workoutController.getWorkoutDetail);
Router.post("/:pid", workoutController.addWorkout);
Router.patch("/:wid", workoutController.updateWorkout);
Router.delete("/:pid/:wid", workoutController.removeWorkout);

module.exports = Router;
