const { body, validationResult } = require("express-validator");

module.exports = {
  validate: [
    body("email", "Email is not valid").isEmail().normalizeEmail(),
    body("password", "Password must contain at least 5 characters").isLength({
      min: 5,
      max: 1000,
    }),
  ],
  getValidationErrors: (req) => {
    let errors = validationResult(req);
    let error = "";
    if (errors.isEmpty()) return error;
    error = "Invalid Email or Password";
    return error;
  },
};
