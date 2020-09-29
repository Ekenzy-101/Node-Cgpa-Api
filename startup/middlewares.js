const express = require("express");
const cors = require("cors");
const usersRouter = require("../routes/users");
const coursesRouter = require("../routes/courses");
const authRouter = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = (app) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use("/api/users", usersRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/auth", authRouter);
  app.use(error);
};
