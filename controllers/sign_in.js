const jwt = require("jsonwebtoken");
const { userDataValidator, setIdType } = require("../services/validator");
const { JWT_SECRET } = require("../config/env");
const UserModel = require("../db/schema");
const { notFound } = require("../lib/errors");

module.exports = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    userDataValidator(userData);
    setIdType(userData);

    const existentUser = await UserModel.findOne(userData);
    if (!existentUser) {
      throw notFound();
    }
    const token = jwt.sign(userData, JWT_SECRET);
    existentUser.tokens.push({
      expires: Date.now() + 600000,
      value: token,
    })

    await UserModel.updateOne({ id: existentUser.id }, existentUser);

    res.status(200).send({ token });
  } catch (error) {
    return next(error);
  }
}
