// const { Author } = require('../db/models/authorModel');
// const HttpError = require('../helpers/httpError');

const isHaveAccess = async (req, res, next) => {
  //   try {
  //     const { id: userId } = req.user;
  //     const { id: authorId } = req.params;
  //     const { owner: ownerId } = await Author.findById(authorId);
  //     console.log(ownerId.toString());
  //     if (ownerId.toString() !== userId) {
  //       next(HttpError(403, 'Forbidden, you do not have access '));
  //     }
  next();
  //   } catch (err) {
  //     next(err);
  //   }
};
module.exports = isHaveAccess;
