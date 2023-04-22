const pagination = (page = 1, customLimit = 10) => {
  let limit = customLimit;
  const maxLimit = 200;
  if (limit > maxLimit) {
    limit = 200;
  }
  const skip = (page - 1) * limit;

  return [skip, limit];
};
module.exports = pagination;
