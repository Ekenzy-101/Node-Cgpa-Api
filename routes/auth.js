const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  validate,
  getValidationErrors,
} = require("../middlewares/validateLogin");

router.post("/", validate, async (req, res) => {
  // Validate request from the body
  let error = getValidationErrors(req);
  if (error) return res.status(400).send(error);

  // Check if a user is registered with the email
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    error = "Invalid Email or Password";
    return res.status(400).send(error);
  }

  // Check if the user password match
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) {
    error = "Invalid Email or Password";
    return res.status(400).send(error);
  }

  // Generate token for the user
  const token = await user.generateAuthToken();
  res.json(token);
});

module.exports = router;
