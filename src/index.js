const app = require("express")();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoutes");
const dayRoutes = require("./routes/dayRoutes");
const weekRoutes = require("./routes/weekRoutes");
const workoutDetailRoutes = require("./routes/workoutDetailRoutes");
const bodyPartsRoutes = require("./routes/bodyPartsRoutes");
const summaryRoutes = require("./routes/summaryRoute");
const userRoutes = require("./routes/userRoutes");
const db = require("./utils/db");
const userController = require("./controller/userController");
const passport = require("passport");

const url =
  "mongodb+srv://tusharbz:Tushar@cluster0-eh0ti.gcp.mongodb.net/Gym?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("App is up and running...");
});
require("./Auth/Auth");

app.post(
  "/register",
  passport.authenticate("signup", { session: false }),
  userController.Register
);
app.post("/login", userController.Login);

app.use(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutRoutes
);
app.use("/day", passport.authenticate("jwt", { session: false }), dayRoutes);
app.use("/week", passport.authenticate("jwt", { session: false }), weekRoutes);
app.use(
  "/workoutDetail",
  passport.authenticate("jwt", { session: false }),
  workoutDetailRoutes
);
app.use(
  "/bodyparts",
  passport.authenticate("jwt", { session: false }),
  bodyPartsRoutes
);
app.use(
  "/summary",
  passport.authenticate("jwt", { session: false }),
  summaryRoutes
);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);

app.listen(port, () => {
  // db.con.connect(function (err) {
  //   if (err) console.log("eerr"err)
  //   console.log("Connected!");
  // });
});
