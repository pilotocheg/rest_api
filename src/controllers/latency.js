const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
  try {
    const startTime = Date.now();
    await fetch("https://google.com");
    const endTime = Date.now();

    res.status(200).send({
      latency: `${endTime - startTime} ms`,
    });
  } catch (error) {
    return next(error);
  }
}
