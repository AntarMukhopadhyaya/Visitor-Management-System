// EXPRESS APP That Recieves SEND DATA TO DataLoad.js
// ________________________________________________________
// IMPORTANT IMPORTS
const express = require("express");
const port = 3000;
const app = express();
const visitor = require("./models/visitor");
const { response } = require("express");
// _________________________________________________________________________________
// ROUTE IN WHICH DATA IS AVAIALBLE
app.get("/visitors", (req, res) => {
  visitor
    .getVisitor()
    .then((response) => {
      res.json(response);
    })
    .catch(() => {
      console.log("ERR");
    });
});
// _______________________________________________________________________________
// RUNNING SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// _______________________________________________________________________________
