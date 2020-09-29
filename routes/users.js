const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  validate,
  getValidationErrors,
} = require("../middlewares/validateUser");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

router.get("/", [auth, admin], async (req, res, next) => {
  const users = await User.find({}).select("-__v -password ");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-__v -password");
  res.send(user);
});

router.post("/", validate, async (req, res) => {
  // Validate request from the body
  let error = getValidationErrors(req);
  let { email, firstname, lastname, password } = error;
  if (email.length || firstname.length || lastname.length || password.length)
    return res.status(400).send(error);

  // Check if a user is registered with the email
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // email.push("A user is registered with this email");
    return res.status(400).send("A user is registered with this email");
  }

  // Create and save the user to the db
  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Generate token for the user
  const token = await user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "firstname", "lastname", "email", "isAdmin"]));
});

module.exports = router;
