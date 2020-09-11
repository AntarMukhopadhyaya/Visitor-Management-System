const mysql = require("mysql");
// Connecting to Database

module.exports.getVisitor = function () {
  return new Promise(function (resolve, reject) {
    let con;
    con = mysql.createConnection({
      user: "root",
      password: "",
      host: "localhost",
      database: "management",
    });
    con.connect(function (err) {
      if (err) throw err;
    });
    const query = "SELECT * FROM `visitors`";
    con.query(query, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
    con.end(() => {
      console.log("Connection Ended");
    });
  });
};
