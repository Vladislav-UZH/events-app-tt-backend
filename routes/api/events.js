const express = require('express');
const ctrl = require('../../controllers');
const { schemas } = require('../../db/models/eventModel');
const {
  authenticate,
  isValidId,
  validateBody,
  hasAccessToIt,
} = require('../../middlewares');
const router = express.Router();

// getting events
router.get(
  '/author/:id',
  authenticate,
  hasAccessToIt,
  isValidId,
  ctrl.getAllEvents
);
router.get('/:id', authenticate, isValidId, ctrl.getEventById);
// setting events
router.post(
  '/author/:id',
  authenticate,
  isValidId,
  hasAccessToIt,
  validateBody(schemas.createEventSchema, 400),
  ctrl.createEvent
);
router.delete('/:id', authenticate, isValidId, ctrl.deleteEvent);

module.exports = router;
