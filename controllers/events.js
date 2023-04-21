const { Event } = require('../db/models/eventModel');
const HttpError = require('../helpers/httpError');
// controllers of getting events
const getAllEvents = async (req, res) => {
  const { id: authorId } = req.params;
  // pagination
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  // Access checking

  // request for events
  const events = await Event.find({ authorId }, '-createdAt -updatedAt', {
    skip,
    limit,
  });

  if (!events) {
    throw HttpError(404);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: events,
  });
};
const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    throw HttpError(404);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: event,
  });
};

// controllers of setting events
const createEvent = async (req, res) => {
  const { id: owner } = req.params;
  const { startDate } = req.body;
  const excludedFields = {
    createdAt: 0,
    updatedAt: 0,
  };
  const hasAlreadyEvent = await Event.findOne({ owner, startDate });

  if (hasAlreadyEvent) {
    throw HttpError(409, `You already have the event started at ${startDate}`);
  }
  const newEvent = await Event.create({ ...req.body, owner }, excludedFields);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: newEvent,
  });
};
const deleteEvent = async (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'deleted successfully',
  });
};
module.exports = { getAllEvents, getEventById, createEvent, deleteEvent };
