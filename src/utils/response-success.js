class ResponseSuccess {
  constructor(status, message, data = null, pagination = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  static ok(message, data = null, pagination = null) {
    return new ResponseSuccess(200, message, data, pagination);
  }

  static created(message, data = null, pagination = null) {
    return new ResponseSuccess(201, message, data, pagination);
  }

  static noContent(message = "No content") {
    return new ResponseSuccess(204, message);
  }
}

export default ResponseSuccess;
