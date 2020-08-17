'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "vietanh",
  password: process.env.DB_PASS || "clappi1004##",
  database: process.env.DB_NAME || "pre_wara"
});
db.connect(err=>{
    if(err) console.log(err,'dfsf');
    console.log('database is connect')
})
module.exports = db;