const validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  const errors = {};
  data.handle = _.isEmpty(data.handle) ? "" : data.handle;
  data.status = _.isEmpty(data.status) ? "" : data.status;
  data.skills = _.isEmpty(data.skills) ? "" : data.skills;

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle has to be 2 to 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skill is required";
  }

  if (!_.isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Website is not a valid URL";
    }
  }

  if (!_.isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!_.isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!_.isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!_.isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!_.isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Website is not a valid URL";
    }
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
