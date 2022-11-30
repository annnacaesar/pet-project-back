module.exports = class CustomError {
  constructor(message, status = 500, additionalInfo = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
};
