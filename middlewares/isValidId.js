const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/httpError');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  
  if (!isValidObjectId(id)) {
    next(HttpError(400, 'Invalid ID'));
  }
  next();
};
module.exports = isValidId;
