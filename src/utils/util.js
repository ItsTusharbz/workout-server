// const bcrypt = require("bcrypt");
const moment = require("moment");

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

const getToday = () => {
  return moment().format("L");
};

exports.exportData = exportData;
exports.mongoGetter = mongoGetter;
exports.exportError = exportError;
exports.encrypPassword = encrypPassword;
exports.getToday = getToday;
