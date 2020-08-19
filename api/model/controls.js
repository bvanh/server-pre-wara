"use strict";
const util = require("util");
const mysql = require("mysql");
const db = require("../db");
const isFake = false;

module.exports = {
  get: (req, res) => {
    let sql = 'SHOW INDEXES FROM info_register WHERE Key_Name="PRIMARY"';
    let fake_mail = "SELECT currentMail from fake_info";
    switch (isFake) {
      case true:
        db.query(fake_mail, (err, response) => {
          if (err) res.status(400).send(err);
          res.send(response[0]);
        });
        break;
      default:
        db.query(sql, (err, response) => {
          if (err) res.status(400).send(err);
          res.json({ currentMail: response[0].Cardinality });
        });
        break;
    }
  },
  create: (req, res) => {
    let { mail, phone } = req.body;
    db.query(
      "insert into info_register set ?",
      { mail: mail, phone: phone },
      (err, response) => {
        if (err) {
          if (err.errno === 1062) {
            res.status(400).json({
              message: "Email đã tồn tại !",
              status: 400,
            });
          }
          res.status(400).json({
            message: "ERROR!",
            res: err,
            status: 400,
          });
        }
        res.json({
          message: "Gửi email thành công!",
          status: 200,
        });
      }
    );
  },
  // cong fake data
  add: (req, res) => {
    let sql = "UPDATE fake_info SET currentMail = currentMail + 1";
    db.query(sql, (err, response) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json({ message: "add fake success!", response });
    });
  },
};
