const { User } = require('../db/models/userModel');
const { HttpError, hashPasswordService } = require('../helpers');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already exists');
  }
  // password hashing
  const hashedPassword = await hashPasswordService.createHashPassword(password);

  // creating user
  const createdUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  // token processing
  const payload = { id: createdUser._id };
  const time = '23h';
  const token = jwt.sign(payload, SECRET, { expiresIn: time });
  await User.findByIdAndUpdate(createdUser._id, { token });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let token = null;
  const ourUser = await User.findOne({ email });
  // checking user credentials
  if (!ourUser) {
    throw HttpError(401, 'Email or password invalid');
  }
  const isPasswordCorrect = await hashPasswordService.comparePasswordAndHash(
    password,
    ourUser.password
  );
  if (!isPasswordCorrect) {
    throw HttpError(401, 'Email or password invalid');
  }
  // token creation
  token = ourUser.token;
  const payload = { id: ourUser._id };
  const time = '23h';

  if (!token) {
    token = jwt.sign(payload, SECRET, { expiresIn: time });
    ourUser.token = token;
    await ourUser.save();
  }

  //
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

const getCurrent = async (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
  });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Logout successful',
  });
};
module.exports = { register, login, getCurrent, logout };
