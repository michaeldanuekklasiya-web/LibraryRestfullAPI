class ResponseSuccess {
  constructor(message, data = null, pagination = null) {
    this.error = false;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  static ok(message, data = null, pagination = null) {
    return {
      statusCode: 200,
      body: new ResponseSuccess(message, data, pagination),
    };
  }

  static created(message, data = null, pagination = null) {
    return {
      statusCode: 201,
      body: new ResponseSuccess(message, data, pagination),
    };
  }

  static noContent(message = "No content") {
    return {
      statusCode: 204,
      body: new ResponseSuccess(message),
    };
  }
}

export default ResponseSuccess;
