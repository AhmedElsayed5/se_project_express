// status code 401
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = NotFoundError;
