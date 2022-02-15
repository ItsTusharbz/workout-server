// const bcrypt = require("bcrypt");
const moment = require("moment");
const bcrypt = require("bcrypt");

const exportData = (data) => {
  return {
    data: data,
    status: 200,
    errorStatus: false,
  };
};

const exportError = (code, errorMessage) => {
  return {
    status: code,
    errorStatus: true,
    errorMessage: errorMessage,
  };
};

const mongoGetter = (data) => {
  return data.map((item) => item.toObject({ getters: true }));
};

const encrypPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

const getToday = () => {
  return moment().format("L");
};

// convert {reps:"12,32",weight:"21,23",duration:"24,54"} =
// [{reps:"1",weight:"21",duration:"24"},{reps:"32",weight:"23",duration:"54"}]

const prepareSummaryData = (data) => {
  const detail = [];
  let i = 0;
  const idArray = data.id.split(",");
  const repsArray = data.reps ? data.reps.split(",") : [];
  const weightArray = data.weight ? data.weight.split(",") : [];
  const durationArray = data.duration ? data.duration.split(",") : [];
  const statusArray = data.status ? data.status.split(",") : [];
  while (i < idArray.length) {
    detail.push({
      id: idArray[i] ? idArray[i] : null,
      reps: repsArray[i] ? repsArray[i] : null,
      weight: weightArray[i] ? weightArray[i] : null,
      duration: durationArray[i] ? durationArray[i] : null,
      status: statusArray[i] ? statusArray[i] : null,
    }),
      i++;
  }
  return detail;
};

exports.prepareSummaryData = prepareSummaryData;
exports.exportData = exportData;
exports.mongoGetter = mongoGetter;
exports.exportError = exportError;
exports.encrypPassword = encrypPassword;
exports.getToday = getToday;
exports.formatDate = formatDate;
