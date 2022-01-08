const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");

const getUsers = async (req, res, next) => {
  const sqlquery = "SELECT * from users where 1";
  con.query(sqlquery, (err, result) => {
    res.send(exportData(result));
  });
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
};

exports.getUsers = getUsers;
exports.saveUser = saveUser;
exports.updateUser = updateUser;
