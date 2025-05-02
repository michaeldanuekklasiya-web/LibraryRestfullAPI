class ResponseSuccess {
  constructor(code, status, message, data = {}, meta = null) {
    this.code = code;
    this.status = status;
    this.success = true;
    this.data = data;
    this.errors = [];
    this.meta = meta;
  }

  static ok(message = "OK", data = {}, meta = null) {
    const body = new ResponseSuccess(200, "OK", message, data, meta);
    return { statusCode: 200, body };
  }

  static created(message = "Created", data = {}, meta = null) {
    const body = new ResponseSuccess(201, "CREATED", message, data, meta);
    return { statusCode: 201, body };
  }

  static noContent(message = "No Content") {
    const body = new ResponseSuccess(204, "NO_CONTENT", message);
    return { statusCode: 204, body };
  }
}

class ResponseError extends Error {
  constructor(code, status, message, errors = []) {
    super(message);
    this.code = code;
    this.status = status;
    this.success = false;
    this.data = {};
    this.meta = null;
    this.message = message;

    // Tambahkan message utama ke awal errors hanya jika belum ada
    const messageIncluded = errors.some(
      (err) => typeof err === "object" && err.message === message
    );

    this.errors = Array.isArray(errors) && errors.length > 0 ? errors : [{ message }];
  }

  static badRequest(message = "Bad Request", errors = []) {
    return new ResponseError(400, "BAD_REQUEST", message, errors);
  }

  static unauthorized(message = "Unauthorized", errors = []) {
    return new ResponseError(401, "UNAUTHORIZED", message, errors);
  }

  static forbidden(message = "Forbidden", errors = []) {
    return new ResponseError(403, "FORBIDDEN", message, errors);
  }

  static notFound(message = "Not Found", errors = []) {
    return new ResponseError(404, "NOT_FOUND", message, errors);
  }

  static conflict(message = "Conflict", errors = []) {
    return new ResponseError(409, "CONFLICT", message, errors);
  }
}

export { ResponseSuccess, ResponseError };
