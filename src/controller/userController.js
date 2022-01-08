const HttpError = require("../model/httpError");
const { exportData, exportError } = require("../utils/util");
const { con } = require("../utils/db");
const { USER_DOESNT_EXISTS_CODE } = require("../utils/constants");

const fetchUser = async (userId) => {
  let sqlquery = "SELECT * from users where 1";
  if (userId) {
    sqlquery = "SELECT * from users where id=" + userId;
  }
  return new Promise((resolve, reject) => {
    con.query(sqlquery, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const getUsers = async (req, res, next) => {
  const { userId } = req.params;
  const userData = await fetchUser(userId);
  if (userData.length) {
    res.send(exportData(userData));
  } else {
    res.send(exportError(USER_DOESNT_EXISTS_CODE, "User doesnt exists"));
  }
};

const saveUser = async (req, res, next) => {
  const { name, username, email, password, contact, address } = req.body;
  const isActive = "active";
  const sqlquery = `Insert into users (name, username, email, password, contact ,status, address) values (?,?,?,?,?,?,?)`;
  con.query(
    sqlquery,
    [name, username, email, password, contact, isActive, address],
    (err, result) => {
      if (err) {
        const error = new HttpError(err, 500);
        return next(error);
      } else {
        res.send(exportData(result));
      }
    }
  );
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, address, email, contact } = req.body;
  const userData = await fetchUser(userId);
  if (userData.length) {
    const sqlquery =
      "UPDATE users SET name = ?, address = ?, email = ?, contact = ? where id = ?";
    con.query(
      sqlquery,
      [name, address, email, contact, userId],
      (err, result) => {
        if (err) {
          const error = new HttpError(err, 500);
          return next(error);
        } else {
          res.send(exportData(result));
        }
      }
    );
  } else {
    res.send(exportError(USER_DOESNT_EXISTS_CODE, "user doesnt exists"));
  }
};

exports.getUsers = getUsers;
exports.saveUser = saveUser;
exports.updateUser = updateUser;
