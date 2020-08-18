"use strict";
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "vietanh",
  password: process.env.DB_PASS || "clappi1004##",
  database: process.env.DB_NAME || "pre_wara",
  port: "3307",
});
db.connect((err) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error(err.message, "Database connection was refused.");
    }
  }
});

module.exports = db;
