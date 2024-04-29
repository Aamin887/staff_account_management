class AppError extends Error {
  constructor(errCode, message, errStatus) {
    this.message = message;
    this.errCode = errCode;
    this.errStatus = errStatus;
  }
}

module.exports = AppError;
