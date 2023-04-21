const HttpError = require('../helpers/httpError');

const validateBody = (schema, statusCode = 400, errorMessage) => {
  const checker = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const isEmptyBody = !!Object.keys(req.body).length;
    if (!isEmptyBody) {
      next(HttpError(400, 'missing fields'));
    }
    if (error) {
      next(
        HttpError(
          statusCode,
          errorMessage || `missing required ${error.details[0].path[0]} field`
        )
      );
    }
    next();
  };
  return checker;
};
module.exports = validateBody;
