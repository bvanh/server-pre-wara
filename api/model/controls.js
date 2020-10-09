"use strict";
const redis = require("redis");
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const db = require("../db");
const isFake = true;

module.exports = {
  get: (req, res, next) => {
    let sql = 'SHOW INDEXES FROM info_register WHERE Key_Name="PRIMARY"';
    let fake_mail = "SELECT currentMail from fake_info";
    // checkCache(req, res, next);
    switch (isFake) {
      case true:
        db.query(fake_mail, (err, response) => {
          if (err) res.status(400).send(err);
          console.log(response[0]);
          res.send(response[0]);
          // client.setex("currentMail", 900, JSON.stringify(response[0]));
        });
        break;
      default:
        db.query(sql, (err, response) => {
          if (err) res.status(400).send(err);
          res.json({ currentMail: response[0].Cardinality });
          // client.setex("currentMail", 900, JSON.stringify(response[0].Cardinality));
        });
        break;
    }
  },
  checkCache: (req, res, next) => {
    client.get("currentMail", (err, data) => {
      if (err) {
        throw err;
      }
      if (data != null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  },
  create: (req, res) => {
    let sql = "UPDATE fake_info SET currentMail = currentMail + 1";
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
        db.query(sql, (err, response) => {
          if (err) {
            console.log(err);
          }
          console.log(response);
          // res.json({ message: "add fake success!", response });
        });
      }
    );
  },
  // cong fake data
  add: (req, res) => {
    let sql = "UPDATE fake_info SET currentMail = currentMail + 5";
    db.query(sql, (err, response) => {
      if (err) {
        res.status(400).send(err);
      }
      console.log(response);
      // res.json({ message: "add fake success!", response });
    });
  },
};
