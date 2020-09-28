const winston = require("winston");
const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();

require("./startup/logging")();
require("./startup/config")();
require("./startup/middlewares")(app);
require("./startup/db")();

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
