const ctrlWrapper = require('../helpers/ctrlWrapper');
const { register, login, getCurrent, logout } = require('./auth');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
} = require('./authors');
const {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
} = require('./events');

const ctrl = {
  // for authRouter
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  // For authorsRouter
  getAllAuthors: ctrlWrapper(getAllAuthors),
  getAuthorById: ctrlWrapper(getAuthorById),
  createAuthor: ctrlWrapper(createAuthor),
  deleteAuthor: ctrlWrapper(deleteAuthor),
  // For EventsRouter
  getAllEvents: ctrlWrapper(getAllEvents),
  getEventById: ctrlWrapper(getEventById),
  createEvent: ctrlWrapper(createEvent),
  deleteEvent: ctrlWrapper(deleteEvent),
};
module.exports = ctrl;
