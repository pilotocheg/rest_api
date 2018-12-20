const { missRequired, validationError } = require("../lib/errors");

function isEmail(value) {
  return (
    /^[A-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/.test(value)
  );
};

function isPhone(value) {
  return /^(?:\+\d{2})*\d{10}$/.test(value);
};

module.exports = {
  userDataValidator(userData) {
    if (!(Object.keys(userData))) {
      throw missRequired("You don't pass user's data");
    } else if (!userData.id || !userData.password) {
      throw missRequired(`You miss required property ${!userData.id ? "id" : "password"}`)
    } else if (typeof userData.id !== "string" || typeof userData.password !== "string") {
      throw validationError("One of properties has an invalid data type. Expected a string")
    }
  },
  setIdType(userData) {
    if (isEmail(userData.id)) {
      userData.idType = "email";
    } else if (isPhone(userData.id)) {
      userData.idType = "phone";
    } else {
      throw validationError("Wrong id value. Expected to receive phone number or email");
    }
  },
  checkQuery(queryParams) {
    if (!Object.keys(queryParams) || ! queryParams.all) {
      throw missRequired("You don't pass 'all' query parameter")
    } else if (!["true", "false"].includes(queryParams.all)) {
      throw validationError("Query parameter 'all' has invalid value. Expected 'true' or 'false'")
    }
  }
}
