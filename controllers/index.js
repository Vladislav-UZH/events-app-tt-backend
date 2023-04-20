const ctrlWrapper = require("../helpers/ctrlWrapper");
const { registerCtrl, loginCtrl } = require("./auth");
// const { some } = require("./authors");
// const { somee } = require("./events");

module.exports = {
  registerCtrl: ctrlWrapper(registerCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
};
