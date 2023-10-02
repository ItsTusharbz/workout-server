var mysql = require("mysql2");

const con = mysql.createPool({
  host: "103.191.208.225",
  user: "agdvpnxc_wroot",
  password: "Tushar@123",
  database: "agdvpnxc_workout",
  connectionLimit : 10,
});

exports.con = con;
