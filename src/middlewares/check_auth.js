const jwt = require("express-jwt");
const { JWT_SECRET } = require("../../config/env");
const { notFound, unauthorized } = require("../lib/errors");
const UserModel = require("../db/schema");

async function isExpires(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let user = { ...req.user };

    user = await UserModel.findOne({ id: user.id });
    if (!user) throw notFound();

    token = user.tokens.find((existentToken) => existentToken.value === token);
    if (!token) throw unauthorized("Invalid token");

    if (token.expires < Date.now()) {
      throw unauthorized("Your session has expired");
    }
    token.expires = Date.now() + 600000;

    user.tokens.forEach((prevToken) => {
      if (prevToken.value = token.value) {
        prevToken = { ...token };
      }
    });

    await UserModel.updateOne({ id: user.id }, user);
    return next();

  } catch (error) {
    return next(error);
  }
}

module.exports = [
  jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }),
  isExpires,
];
