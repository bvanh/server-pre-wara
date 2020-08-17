"use strict";
const util = require("util");
const mysql = require("mysql");
const db = require("../db");

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM info_register";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM info_register WHERE id = ?";
    db.query(sql, [req.params.productId], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let productId = req.params.productId;
    let sql = "UPDATE info_register SET ? WHERE id = ?";
    db.query(sql, [data, productId], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO info_register SET ?";
    db.query(sql, { ...data }, (err, response, results, fields) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json({ message: "Insert success!", data: req.body, status: 200 });
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM info_register WHERE id = ?";
    db.query(sql, [req.params.productId], (err, response, results) => {
      if (err) throw err;
      res.json({ message: "Delete success!", response });
    });
  },
};
