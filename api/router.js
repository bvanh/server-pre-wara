"use strict";
const redis = require("redis");
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
module.exports = function (app) {
  let api = require("./model/controls");

  // todoList Routes
  app.route("/create").post(api.create);
  app.route("/add_fake").put(api.add);
  app.route("/info").get(api.get);
};
