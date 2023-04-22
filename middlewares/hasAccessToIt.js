const { Author } = require('../db/models/authorModel');
const HttpError = require('../helpers/httpError');

const hasAccessToIt = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: authorId } = req.params;
    const { owner } = await Author.findById(authorId);
    const stringifiedOwnerId = owner.toString();
    if (stringifiedOwnerId !== userId) {
      next(HttpError(403, 'Forbidden, you do not have access '));
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = hasAccessToIt;
