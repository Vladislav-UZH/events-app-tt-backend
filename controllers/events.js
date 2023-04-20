const { Event } = require("../db/models/userModel");
const HttpError = require("../helpers/httpError");

const createEventCtrl = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json(newEvent);
};
const deleteEventCtrl = async (req, res) => {
  const { id } = req.params;
};
module.exports = { createEventCtrl, deleteEventCtrl };
