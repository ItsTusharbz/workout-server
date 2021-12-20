var mysql = require("mysql");
const con = mysql.createConnection({
  host: "103.102.234.200",
  user: "agdvpnxc_root",
  password: "Tushar@123",
  database: "agdvpnxc_workout",
});

exports.con = con;
