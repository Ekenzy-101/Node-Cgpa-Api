const { body, validationResult } = require("express-validator");

module.exports = {
  validate: [
    body("firstname")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required"),
    body("lastname")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Field is required"),
    body("email")
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail()
      .isLength({ max: 250 })
      .withMessage("Field should be less than 250 characters"),
    ,
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
