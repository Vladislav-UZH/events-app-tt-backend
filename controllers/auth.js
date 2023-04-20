const { User } = require("../db/models/userModel");
const HttpError = require("../helpers/httpError");
const hashPasswordService = require("../helpers/hashPasswordService");
const jwtService = require("../helpers/jwtService");

const registerCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }
  const hashedPassword = await hashPasswordService.createHashPassword(password);
  const createdUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const token = jwtService.createToken(createdUser.id);

  res.status(201).json({ token });
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const ourUser = await User.findOne({ email });
  if (!ourUser) {
    throw HttpError(401, "Email or password invalid");
  }
  const isPasswordCorrect = await hashPasswordService.comparePasswordAndHash(
    password,
    ourUser.password
  );
  if (!isPasswordCorrect) {
    throw HttpError(401, "Email or password invalid");
  }

  res.status(200).json(ourUser.token);
};

module.exports = { registerCtrl, loginCtrl };
