// code 404
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
  // edit
}

module.exports = NotFoundError;
