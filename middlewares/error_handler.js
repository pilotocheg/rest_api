const Debug = require("debug");

const debug = Debug("test_api");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (typeof err === "string") {
    res.status(404).send(err);
  }
  debug(err);
  res.status(err.status || 500).send(err);
}
