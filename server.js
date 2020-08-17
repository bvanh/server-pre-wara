let express = require("express");
let bodyparser = require("body-parser");
let cronjob = require("./api/cronmail");
const app = express();
let port = process.env.PORT || 8000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let routes = require("./api/router"); //importing route
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
routes(app);
cronjob.addFakeMail();
app.listen(port);

console.log("RESTful API server started on: " + port);
