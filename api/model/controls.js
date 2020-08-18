"use strict";
const util = require("util");
const mysql = require("mysql");
const db = require("../db");
const isFake = true;

module.exports = {
  get: (req, res) => {
    let sql = 'SHOW INDEXES FROM info_register WHERE Key_Name="PRIMARY"';
    let fake_mail = "SELECT currentMail from fake_info";
    switch (isFake) {
      case true:
        db.query(fake_mail, (err, response) => {
          if (err) res.send(err);
          res.json(response);
        });
        break;
      default:
        db.query(sql, (err, response) => {
          if (err) res.send(err);
          res.json({ currentMail: response[0].Cardinality });
        });
        break;
    }
  },
  create: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO info_register SET ?";
    db.query(sql, { ...data }, (err, response, results, fields) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json({ message: "Insert success!", data: req.body, status: 200 });
    });
  },
  // cong fake data
  add: (req, res) => {
    let sql = "UPDATE fake_info SET currentMail = currentMail + 1";
    db.query(sql, (err, response) => {
      if (err) {
        res.status(400).send(err);
      }
      // res.json({ message: "add fake success!", response });
    });
  },
};
