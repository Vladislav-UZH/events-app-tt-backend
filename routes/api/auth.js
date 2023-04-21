const express = require('express');
const ctrl = require('../../controllers');
const { schemas } = require('../../db/models/userModel');
const { authenticate, validateBody } = require('../../middlewares');
const router = express.Router();
router.post(
  '/registration',
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
module.exports = router;
