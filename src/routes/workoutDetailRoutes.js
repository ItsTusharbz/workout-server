const express = require("express");
const Router = express.Router();

const workoutDetailController = require("../controller/workoutDetailController");

Router.get("/:workoutId", workoutDetailController.getWorkoutsDetail);
Router.post("/", workoutDetailController.addWorkoutDetail);
Router.put("/:workoutDetailId", workoutDetailController.updateWorkoutDetail);
Router.delete("/:workoutDetailId", workoutDetailController.removeWorkoutDetail);
Router.patch("/:workoutDetailId", workoutDetailController.updateWorkoutDetailStatus);

module.exports = Router;
