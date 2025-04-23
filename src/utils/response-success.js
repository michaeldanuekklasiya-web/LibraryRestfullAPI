class ResponseSuccess {
  constructor(error, message, data = null, pagination = null) {
    this.error = error;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  static ok(message, data = null, pagination = null) {
    return new ResponseSuccess(false, message, data, pagination);
  }

  static created(message, data = null, pagination = null) {
    return new ResponseSuccess(false, message, data, pagination);
  }

  static noContent(message = "No content") {
    return new ResponseSuccess(false, message);
  }
}

export default ResponseSuccess;
