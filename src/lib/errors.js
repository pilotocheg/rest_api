class HttpError {
  constructor(status, code, message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = {
  missRequired(message) {
    return new HttpError(400, "missed_required", message);
  },
  validationError(message) {
    return new HttpError(429, "validation_error", message);
  },
  alreadyExists(userId) {
    return new HttpError(409, "already_exist", `User ${userId} already exists`);
  },
  notFound() {
    return new HttpError(404, "not_found", "User not found");
  },
  unauthorized(message) {
    return new HttpError(401, "unathorized", message);
  }
}
