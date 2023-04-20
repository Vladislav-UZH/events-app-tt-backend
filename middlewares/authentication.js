const HttpError = require("../helpers/httpError");
const jwtService = require("../helpers/jwtService");

const authentication = (req, res, next) => {
  const { authortization = "" } = req.headers;
  const [bearer, token] = authortization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwtService.verifyToken(token);
    if (!id) {
      next(HttpError(401));
    }
    next();
  } catch {
    next(HttpError(401));
  }
};
module.exports = authentication;
