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
var mysql = require("mysql");

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
  // mongoose
  //   .connect(url, { useUnifiedTopology: true })
  //   .then(() => {
  //     console.log("Db Connected");
  //     console.log(`http://localhost:${port}/`);
  //   })
  //   .catch((err) => console.log(err));
  var con = mysql.createConnection({
    host: "103.102.234.200",
    user: "agdvpnxc_root",
    password: "Tushar@123",
    database: "agdvpnxc_workout"
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
});
