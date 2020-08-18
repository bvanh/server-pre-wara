let express = require("express");
let bodyparser = require("body-parser");
let cronjob = require("./api/cronmail");
const app = express();
let port = process.env.PORT || 8000;
let routes = require("./api/router"); //importing route
routes(app);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
cronjob.addFakeMail();
app.listen(port);

console.log("RESTful API server started on: " + port);
