const { body, validationResult } = require("express-validator");

module.exports = {
  validate: [
    body("firstname")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isLength({ min: 5, max: 25 })
      .withMessage("Field should be between 5 and 25 characters"),
    body("lastname")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required")
      .isLength({ min: 5, max: 25 })
      .withMessage("Field should be between 5 and 25 characters"),
    body("email", "Email is not valid").isEmail().normalizeEmail(),
    body("password", "Password must contain at least 5 characters").isLength({
      min: 5,
      max: 1000,
    }),
  ],
  getValidationErrors: (req) => {
    let errors = validationResult(req);
    let error = {
      firstname: [],
      lastname: [],
      email: [],
      password: [],
    };
    if (errors.isEmpty()) return error;
    for (er of errors.errors) {
      if (er.param === "firstname") error.firstname.push(er.msg);
      if (er.param === "lastname") error.lastname.push(er.msg);
      if (er.param === "email") error.email.push(er.msg);
      if (er.param === "password") error.password.push(er.msg);
    }
    return error;
  },
};
