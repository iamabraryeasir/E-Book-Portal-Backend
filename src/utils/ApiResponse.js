import createHttpError from "http-errors";

class ApiResponse {
  constructor(statusCode, message = "Success", data = {}) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }

  static success(message, data) {
    return new ApiResponse(200, message, data);
  }

  static error(statusCode, message = "Error occurred") {
    return new createHttpError(statusCode, message);
  }
}

export { ApiResponse };
