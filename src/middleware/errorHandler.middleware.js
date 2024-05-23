const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  if (err.name === "inst") {
    res.status(statusCode).json({
      name: err.name,
      message: err.message,
      stact: process.env.NODE_ENV === development ? err.stack : null,
    });
  }

  if (err instanceof AppError) {
    res.status(statusCode).json({
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
