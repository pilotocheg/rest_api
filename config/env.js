require("dotenv").config();

const getEnv = (envName, defaultValue) => process.env[envName] || defaultValue;

module.exports = {
  PORT: getEnv("PORT", 3000),
  MONGO_ENDPOINT: getEnv("MONGO_ENDPOINT", "mongodb://pilotocheg:Pilot122223@ds133348.mlab.com:33348/test_api"),
  JWT_SECRET: getEnv("JWT_SECRET")
}
