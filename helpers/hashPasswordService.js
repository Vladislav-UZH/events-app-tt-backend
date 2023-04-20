const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const comparePasswordAndHash = async (password, hashPassword) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};
const hashPasswordService = { createHashPassword, comparePasswordAndHash };
module.exports = hashPasswordService;
