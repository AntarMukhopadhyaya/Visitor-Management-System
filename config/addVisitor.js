const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const designation = document.querySelector("#designation").value;
  const gender = document.querySelector("#gender").value;

  // Connecting to Database
  const mysql = require("mysql");
  const con = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "management",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  const query =
    "INSERT INTO `visitors` ( `name`, `phone`, `gender`, `designation`) VALUES ( ' " +
    name +
    " ', ' " +
    phone +
    " ', '" +
    gender +
    "', ' " +
    designation +
    "');";

  console.log(query);

  if (
    con.query(query, (err, rows) => {
      if (err) {
        console.log(err);
      }

      console.log(rows);
    })
  ) {
    form.innerHTML = "Entry Added Sucessfully";
  }

  con.end(() => {
    console.log("Connection Closed sucessfully");
  });
}
