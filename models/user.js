const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 250,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1000,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.SECRET_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
