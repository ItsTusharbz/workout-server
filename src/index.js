const app = require("express")();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const workoutRoutes = require("./Routes/WorkoutRoutes");
const dayRoutes = require("./Routes/DayRoutes");
const weekRoutes = require("./Routes/WeekRoutes");

const url = "mongodb+srv://tusharbz:Tushar@cluster0-eh0ti.gcp.mongodb.net/Gym?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;


app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("App is up and running...");
});

app.use("/workout", workoutRoutes);
app.use("/day", dayRoutes);
app.use("/week", weekRoutes);


app.listen(port, () => {
    mongoose
      .connect(url, { useUnifiedTopology: true })
      .then(() => {
        console.log("Db Connected");
        console.log(`http://localhost:${port}/`);
      })
      .catch((err) => console.log(err));
  });
  