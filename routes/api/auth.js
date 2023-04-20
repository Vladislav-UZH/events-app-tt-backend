const express = require("express");
const { registerCtrl, loginCtrl } = require("../../controllers");
const { schemas } = require("../../db/models/userModel");
const validateBody = require("../../middlewares/validateBody");
const router = express.Router();
router.post(
  "/registration",
  validateBody(schemas.registerSchema),
  registerCtrl
);
router.post("/login", validateBody(schemas.loginSchema), loginCtrl);
router.get("/current", () => {});
router.post("/logout", () => {});
module.exports = router;
