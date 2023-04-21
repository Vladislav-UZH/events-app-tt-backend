const express = require('express');
const { isValidId, validateBody, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers');
const { schemas } = require('../../db/models/authorModel');
const router = express.Router();

// getting authors
router.get('/', authenticate, ctrl.getAllAuthors);

router.get('/:id', authenticate, isValidId, ctrl.getAuthorById);
// setting authors
router.post(
  '/',
  authenticate,
  validateBody(schemas.createAuthorSchema, 400),
  ctrl.createAuthor
);
router.delete('/:id', authenticate, isValidId, ctrl.deleteAuthor);

module.exports = router;
