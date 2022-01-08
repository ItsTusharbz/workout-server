const express = require("express");
const Router = express.Router();

const userController = require("../controller/userController");

Router.get("/:userId?", userController.getUsers);
Router.post("/", userController.saveUser);
Router.put("/:userId", userController.updateUser);

module.exports = Router;
