let express = require("express");
const app = express();
var bodyparser = require("body-parser");
let port = process.env.PORT || 3300;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let routes = require('./api/router') //importing route
routes(app)
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(port);

console.log("RESTful API server started on: " + port);
