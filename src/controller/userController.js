const HttpError = require("../model/httpError");
const { exportData, exportError } = require("../utils/util");
const { con } = require("../utils/db");
const { USER_DOESNT_EXISTS_CODE } = require("../utils/constants");
const passport = require("passport");
var jwt = require("jsonwebtoken");

const fetchAllUser = async (userId) => {
  let sqlquery = "SELECT * from users where 1";
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

const fetchUserById = async (userId) => {
  const sqlquery = "SELECT * from users where id=" + userId;
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

const fetchUserByUsername = async (username) => {
  const sqlquery = "SELECT * from users where username=?";
  return new Promise((resolve, reject) => {
    con.query(sqlquery, [username], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result[0]);
    });
  });
};

const getUsers = async (req, res, next) => {
  const { userId } = req.params;
  const userData = await fetchUserById(userId);
  if (userData.length) {
    res.send(exportData(userData));
  } else {
    res.send(exportError(USER_DOESNT_EXISTS_CODE, "User doesnt exists"));
  }
};

const Login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !Object.entries(user).length) {
        const error = new HttpError("Unauthorized", 401);
        req.next(error);
      } else {
        req.login(user, { session: false }, async (error) => {
          if (error) req.next(error);
          const { id, username } = user;
          const token = jwt.sign(
            { user: { id, username } },
            process.env.SECRET,
            {
              algorithm: "HS256",
            }
          );
          return res.json({ token });
        });
      }
    } catch (error) {
      return next("asdad");
    }
  })(req, res, next);
};

const addUser = (userData) => {
  const { username, password } = userData;
  const isActive = "active";
  const sqlquery = `Insert into users (username,password) values (?,?)`;
  return new Promise((resolve, reject) => {
    con.query(sqlquery, [username, password], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const Register = async (req, res, next) => {
  if (req.error) {
    res.send({
      message: "Username already exists",
    });
  }
  res.send({
    message: "Signup successful",
  });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, address, email, contact } = req.body;
  const userData = await fetchUserById(userId);
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
exports.Register = Register;
exports.updateUser = updateUser;
exports.addUser = addUser;
exports.Login = Login;
exports.fetchAllUser = fetchAllUser;
exports.fetchUserById = fetchUserById;
exports.fetchUserByUsername = fetchUserByUsername;
