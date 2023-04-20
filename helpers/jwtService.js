const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// return a created token
const createToken = (payload, expiresIn = "23h") =>
  jwt.sign(payload, SECRET, { expiresIn });

// return a decoded token
const decodeToken = (token) => jwt.decode(token);

//  return a tokens payload
const verifyToken = (token) => jwt.verify(token, SECRET);

const jwtService = { createToken, decodeToken, verifyToken };
module.exports = jwtService;
