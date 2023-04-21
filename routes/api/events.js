const express = require('express');
const ctrl = require('../../controllers');
const { schemas } = require('../../db/models/eventModel');
const {
  authenticate,
  isValidId,
  validateBody,
  isHaveAccess,
} = require('../../middlewares');
const router = express.Router();

// getting events
router.get(
  '/author/:id',
  authenticate,
  isHaveAccess,
  isValidId,
  ctrl.getAllEvents
);
router.get('/:id', authenticate, isValidId, isHaveAccess, ctrl.getEventById);
// setting events
router.post(
  '/author/:id',
  authenticate,

  isValidId,
  isHaveAccess,
  validateBody(schemas.createEventSchema, 400),
  ctrl.createEvent
);
router.delete('/:id', authenticate, isValidId, isHaveAccess, ctrl.deleteEvent);

module.exports = router;
