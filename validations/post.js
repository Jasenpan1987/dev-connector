const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  const errors = {};
  data.text = isEmpty(data.text) ? "" : data.text;

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.post = "Content must between 10 to 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.post = "Content of the post is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
