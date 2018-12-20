const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "User's id is required"],
  },
  password: {
    type: String,
    required: [true, "User's password is required"],
  },
  idType: {
    type: String,
    required: [true, "User's id type is required"],
  },
  tokens: {
    type: [{
      expires: Number,
      value: String,
    }],
    default: [],
  }
});

module.exports = mongoose.model("User", userSchema);
