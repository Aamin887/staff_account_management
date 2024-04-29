const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json(err.message);
};

module.exports = errorHandler;
