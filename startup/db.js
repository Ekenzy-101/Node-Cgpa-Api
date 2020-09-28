const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => winston.info(`Connected to ${process.env.MONGODB_URI}`));
};
