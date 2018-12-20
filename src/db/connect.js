const mongoose = require("mongoose");
const Debug = require("debug");
const { MONGO_ENDPOINT } = require("../../config/env");

const debug = Debug("test_api");

module.exports = mongoose.connect(MONGO_ENDPOINT,{ useNewUrlParser: true })
  .then(() => debug("Successfully conected to db"));
