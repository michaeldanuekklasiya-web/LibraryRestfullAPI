class ResponseError extends Error {
  constructor(status, message, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message = "Bad Request", errors = null) {
    return new ResponseError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized", errors = null) {
    return new ResponseError(401, message, errors);
  }

  static forbidden(message = "Forbidden", errors = null) {
    return new ResponseError(403, message, errors);
  }

  static notFound(message = "Not Found", errors = null) {
    return new ResponseError(404, message, errors);
  }
}

export default ResponseError;
