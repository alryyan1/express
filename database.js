const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.database)
  .then(() => console.log("connected to Db server"));

module.exports = mongoose;
