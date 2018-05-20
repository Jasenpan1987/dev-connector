const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  const errors = {};
  data.text = isEmpty(data.text) ? "" : data.text;

  if (!validator.isLength(data.text, { min: 10, max: 200 })) {
    errors.post = "Comment must between 10 to 200 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.post = "Comment of the post is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
