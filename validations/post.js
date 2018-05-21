const validator = require("validator");
const _ = require("lodash");

module.exports = function validatePostInput(data) {
  const errors = {};
  data.text = _.isEmpty(data.text) ? "" : data.text;

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.post = "Content must between 10 to 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.post = "Content of the post is required.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
