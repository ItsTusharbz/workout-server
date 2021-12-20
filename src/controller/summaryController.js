const HttpError = require("../model/httpError");
const { exportData, getToday } = require("../utils/util");
const { workoutDetailModel } = require("../model/workoutDetailModel");
const { Workout } = require("../model/workoutModel");

const getSummaryByDate = async (req, res, next) => {
  const { date } = req.body;
  const { userId } = req.params;
  try {
    const today = date ? date : getToday();
    const response = await Workout.aggregate([
      {
        $lookup: {
          from: "workoutdetails",
          //   localField: "_id",
          //   foreignField: "workoutId",
          let: { wid: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$workoutId", "$$wid"] } } },
          ],
          as: "detail",
        },
      },
    ]);

    //   .lookup({
    //     from: "workoutdetails",
    //     localField: "_id",
    //     foreignField: "workoutId",
    //     as: "workoutDetail",
    //   });
    // .group({ createdOn: "$workoutId" })
    // .lookup({
    //   from: "bodyParts",
    //   localField: "workout[0].bodyPartId",
    //   foreignField: "_id",
    //   as: "bodyparts",
    // });
    //   .find({ createdOn: today })
    //   .populate({
    //     path: "workoutId",
    //     select: "name",
    //     populate: { path: "bodyPartId", select: "name" },
    //   })

    const workoutDetail = response;
    // .map((w) => ({
    //   id: w._id,
    //   reps: w.reps,
    //   weight: w.weight,
    //   duration: w.duration,
    //   createdOn: w.createdOn,
    //   workoutName: w.workoutId.name,
    //   bodyPartName: w.workoutId.bodyPartId.name,
    // }));

    res.send(exportData(workoutDetail));
  } catch (err) {
    console.log(err);
    const error = new HttpError("No Week found", 500);
    return next(error);
  }
};

exports.getSummaryByDate = getSummaryByDate;
