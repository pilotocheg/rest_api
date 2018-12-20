const jwt = require("jsonwebtoken");
const { userDataValidator, setIdType } = require("../services/validator");
const { JWT_SECRET } = require("../../config/env");
const UserModel = require("../db/schema");
const { alreadyExists } = require("../lib/errors");

module.exports = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    userDataValidator(userData);
    setIdType(userData);

    const existentUser = await UserModel.findOne({ id: userData.id });
    if (existentUser) {
      throw alreadyExists(userData.id);
    }
    const token = jwt.sign(userData, JWT_SECRET);
    userData.tokens = [{
      expires: Date.now() + 600000,
      value: token,
    }]
    await UserModel.create(userData);

    res.status(201).send({ token });
  } catch (error) {
    return next(error);
  }
}
