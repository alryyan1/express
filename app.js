var express = require("express");
const dotenv = require("dotenv");
const patientRouter = require("./routers/patients-router");
var usersRouter = require("./routers/user-router");

var app = express();
app.use((req, res, next) => {
  req.reqTime = Date.now();
  next();
});
app.response.sendStatus = function (status, type, message) {
  return this.contentType(type).status(status).send(message);
};
//general middlewares
app.use(express.static("public"));
app.use(express.json());

//mount routes
app.use("/users", usersRouter);
app.use("/patients", patientRouter);

dotenv.config({ path: "./config.env" });
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`start listening on port ${port}`);
});
