const validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  const errors = {};
  data.email = _.isEmpty(data.email) ? "" : data.email;
  data.password = _.isEmpty(data.password) ? "" : data.password;

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
    isValid: _.isEmpty(errors)
  };
};
