const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
