const UserModel = require("../db/schema");

module.exports = async (req, res, next) => {
  try {
    const userData = { ...req.user };

    const user = await UserModel.findOne({ id: userData.id });
    if (!user) {
      throw notFound();
    }

    res.status(200).send({ id: user.id, idType: user.idType });
  } catch (error) {
    return next(error);
  }
}
