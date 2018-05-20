const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  const errors = {};
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.repassword = isEmpty(data.repassword) ? "" : data.repassword;

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
    isValid: isEmpty(errors)
  };
};
