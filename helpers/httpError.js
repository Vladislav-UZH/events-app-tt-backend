const errorMessages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'NotFound',
};
const HttpError = (statusCode, message = errorMessages[statusCode]) => {
  const err = new Error(message);
  err.status = statusCode;
  return err;
};
module.exports = HttpError;
