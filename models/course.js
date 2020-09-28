const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    uppercase: true,
  },
  code: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
    trim: true,
    uppercase: true,
  },
  unit: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
    trim: true,
  },
  grade: {
    type: String,
    required: true,
    uppercase: true,
    default: "F",
    trim: true,
    enum: ["A", "B", "C", "D", "E", "F"],
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    trim: true,
    required: true,
  },
  weightedScore: {
    type: Number,
    trim: true,
    default: 0,
    required: true,
  },
  semester: {
    type: String,
    enum: ["First", "Second"],
    trim: true,
    required: true,
  },
  level: {
    type: String,
    enum: ["100", "200", "300", "400", "500", "600", "700"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.methods.calculateWeightedScore = function () {
  let score = this.score;
  if (score >= 0 && score < 40) this.weightedScore = 0 * this.unit;
  if (score >= 40 && score < 45) this.weightedScore = 1 * this.unit;
  if (score >= 45 && score < 50) this.weightedScore = 2 * this.unit;
  if (score >= 50 && score < 60) this.weightedScore = 3 * this.unit;
  if (score >= 60 && score < 70) this.weightedScore = 4 * this.unit;
  if (score >= 70) this.weightedScore = 5 * this.unit;
};

courseSchema.methods.calculateGrade = function () {
  let score = this.score;
  if (score >= 0 && score < 40) this.grade = "F";
  if (score >= 40 && score < 45) this.grade = "E";
  if (score >= 45 && score < 50) this.grade = "D";
  if (score >= 50 && score < 60) this.grade = "C";
  if (score >= 60 && score < 70) this.grade = "B";
  if (score >= 70) this.grade = "A";
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
