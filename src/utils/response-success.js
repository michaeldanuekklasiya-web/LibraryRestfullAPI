class ResponseSuccess {
  constructor(status, message, data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static ok(message, data = null) {
    return new ResponseSuccess(200, message, data);
  }

  static created(message, data = null) {
    return new ResponseSuccess(201, message, data);
  }

  static noContent(message = 'No content') {
    return new ResponseSuccess(204, message);
  }
}

export default ResponseSuccess; 