const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducation(data) {
  const errors = {};
  data.school = isEmpty(data.school) ? "" : data.school;
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.fieldofstudy = isEmpty(data.fieldofstudy) ? "" : data.fieldofstudy;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (validator.isEmpty(data.school)) {
    errors.school = "School is required.";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required.";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required.";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
