const { User } = require("../db/models/userModel");
const HttpError = require("../helpers/httpError");

const registerCtrl = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }
  const createdUser = await User.create(req.body);
  res.status(201).json(createdUser);
};

const loginCtrl = async (req, res) => {
  const ourUser = await User.findOne(req.body);
  res.status(200).json(ourUser);
};

module.exports = { registerCtrl, loginCtrl };
