const express = require("express");
const passport = require("passport");
const Router = express.Router();

const userController = require("../controller/userController");

Router.post("/register", passport.authenticate("signup", { session: false }), userController.Register);
Router.post("/login", userController.Login);

module.exports = Router;
