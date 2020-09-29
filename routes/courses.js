const _ = require("lodash");
const express = require("express");
const objectid = require("objectid");
const router = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const {
  validate,
  getValidationErrors,
} = require("../middlewares/validateCourse");
const Course = require("../models/course");

router.get("/", [auth, admin], async (req, res) => {
  const courses = await Course.find({}).select("-__v").sort("-updatedAt");
  res.send(courses);
});

router.get("/me", [auth], async (req, res) => {
  const courses = await Course.find({ user: req.user._id })
    .select("-__v")
    .sort("-updatedAt");
  res.send(courses);
});

router.get("/:id", [auth], async (req, res) => {
  // Check if id is a valid Object ID
  if (!objectid.isValid(req.params.id))
    return res.status(404).send("Invalid Object ID");

  // Check if course exists
  let course = await Course.findById(req.params.id).select("-__v");
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Check if user is owner of the course
  if (course.user.toString() !== req.user._id)
    return res.status(403).send("Access denied");

  res.send(course);
});

router.post("/", [auth, validate], async (req, res) => {
  // Validate request from the body
  let error = getValidationErrors(req);
  let { semester, unit, level, title, code, score } = error;
  if (
    semester.length ||
    unit.length ||
    level.length ||
    title.length ||
    code.length ||
    score.length
  )
    return res.status(400).json(error);

  let obj = _.pick(req.body, [
    "score",
    "grade",
    "semester",
    "unit",
    "level",
    "weightedScore",
    "title",
    "code",
  ]);
  let course = new Course({
    ...obj,
    user: req.user._id,
  });
  course.calculateWeightedScore();
  course.calculateGrade();
  await course.save();

  res.send(course);
});

router.put("/:id", [auth, validate], async (req, res) => {
  // Check if id is a valid Object ID
  if (!objectid.isValid(req.params.id))
    return res.status(404).send("Invalid Object ID");

  // Validate request from the body
  let error = getValidationErrors(req);
  let { semester, unit, level, title, code, score } = error;
  if (
    semester.length ||
    unit.length ||
    level.length ||
    title.length ||
    code.length ||
    score.length
  )
    return res.status(400).json(error);

  // Check if course exists
  let course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Check if user is owner of the course
  if (course.user.toString() !== req.user._id)
    return res.status(403).send("Access denied");

  // Update The Course
  course.semester = req.body.semester;
  course.user = req.user._id;
  course.unit = req.body.unit;
  course.level = req.body.level;
  course.title = req.body.title;
  course.code = req.body.code;
  course.score = req.body.score;
  course.updatedAt = Date.now();

  course.calculateWeightedScore();
  course.calculateGrade();
  await course.save();

  res.send(course);
});

router.delete("/:id", auth, async (req, res) => {
  let id = req.params.id;
  // Check if id is a valid Object ID
  if (!objectid.isValid(id)) return res.status(404).send("Invalid Object ID");

  // Check if course exists
  let course = await Course.findById(id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Check if user is owner of the course
  if (course.user.toString() !== req.user._id)
    return res.status(403).send("Access denied");

  // Delete the course
  let deletedCourse = await Course.findByIdAndRemove(id);
  res.send(deletedCourse);
});
module.exports = router;
