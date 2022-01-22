const express = require("express");
const passport = require("passport");
const Router = express.Router();

const userController = require("../controller/userController");

Router.get("/:userId?", userController.getUsers);
Router.post("/register", userController.Register);
Router.put("/:userId", userController.updateUser);
Router.post("/login", userController.Login);

module.exports = Router;
