const validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  const errors = {};
  data.name = _.isEmpty(data.name) ? "" : data.name;
  data.email = _.isEmpty(data.email) ? "" : data.email;
  data.password = _.isEmpty(data.password) ? "" : data.password;
  data.repassword = _.isEmpty(data.repassword) ? "" : data.repassword;

  if (!validator.isLength(data.name, 2, 30)) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (!validator.isLength(data.password, 4, 30)) {
    errors.password = "password has to be more than 4 characters";
  }

  if (validator.isEmpty(data.repassword)) {
    errors.repassword = "confirm password is required";
  }

  if (!validator.equals(data.repassword, data.password)) {
    errors.repassword = "Password must match to confirm password";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
