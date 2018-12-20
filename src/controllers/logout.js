const UserModel = require("../db/schema");
const { checkQuery } = require("../services/validator");

module.exports = async (req, res, next) => {
  try {
    checkQuery(req.query);
    const userData = { ...req.user };
    const token = req.headers.authorization.split(" ")[1];

    const user = await UserModel.findOne({ id: userData.id });
    if (!user) {
      throw notFound();
    }

    const { all } = req.query;

    if (all === "false") {
      user.tokens = user.tokens.filter(t => t.value !== token);
    } else {
      user.tokens = [];
    }
    await UserModel.updateOne({ id: user.id }, user);

    res.status(200).end();
  } catch (error) {
    return next(error);
  }
}
