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
const summaryRoute = require("./routes/summaryRoute");
const db = require("./utils/db");


const url =
  "mongodb+srv://tusharbz:Tushar@cluster0-eh0ti.gcp.mongodb.net/Gym?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("App is up and running...");
});

app.use("/workout", workoutRoutes);
app.use("/day", dayRoutes);
app.use("/week", weekRoutes);
app.use("/workoutDetail", workoutDetailRoutes);
app.use("/bodyparts", bodyPartsRoutes);
app.use("/summary", summaryRoute);

app.listen(port, () => {
  db.con.connect(function (err) {
    if (err) console.log(err)
    console.log("Connected!");
  });
});
