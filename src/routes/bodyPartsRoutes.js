const express = require("express");
const Router = express.Router();

const bodyPartController = require("../controller/bodyPartController")

Router.get("/", bodyPartController.getBodyPartList);


module.exports = Router;
