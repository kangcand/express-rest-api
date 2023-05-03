let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "express_api",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("connection successfully!");
  }
});

module.exports = connection;
