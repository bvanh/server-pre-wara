"use strict";
module.exports = function (app) {
  let api = require("./model/controls");

  // todoList Routes
  app.route("/info").get(api.get);
  app.route("/create").post(api.create);
  app.route("/add_fake").put(api.add);
};
