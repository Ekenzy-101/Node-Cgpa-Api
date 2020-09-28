const { body, validationResult } = require("express-validator");

module.exports = {
  validate: [
    body("title")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isLength({ min: 5 })
      .withMessage("Field should be up to 5 characters"),
    body("code")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Field should be 6 characters"),
    body("unit")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isInt({ min: 1, max: 6 })
      .withMessage("Field should be between 1 and 6"),
    body("score")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isInt({ min: 0, max: 100 })
      .withMessage("Field should be between 0 and 100"),
    body("semester")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isIn(["First", "Second"])
      .withMessage("Field should be in the given values"),
    body("level")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isIn(["100", "200", "300", "400", "500", "600", "700"])
      .withMessage("Field should be in the given values"),
  ],
  getValidationErrors: (req) => {
    let errors = validationResult(req);
    let error = {
      title: [],
      code: [],
      unit: [],
      score: [],
      semester: [],
      level: [],
    };
    if (errors.isEmpty()) return error;
    for (er of errors.errors) {
      if (er.param === "title") error.title.push(er.msg);
      if (er.param === "code") error.code.push(er.msg);
      if (er.param === "unit") error.unit.push(er.msg);
      if (er.param === "score") error.score.push(er.msg);
      if (er.param === "semester") error.semester.push(er.msg);
      if (er.param === "level") error.level.push(er.msg);
    }
    return error;
  },
};
