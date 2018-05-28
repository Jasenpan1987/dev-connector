const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// get models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const requireLogin = require("../../passport/require-login");
const validateProfileInput = require("../../validations/profile");
const validateExperienceInput = require("../../validations/experience");
const validateEducationInput = require("../../validations/education");

// services
const ProfileService = require("../../services/profile-service");
const profileService = new ProfileService();

const router = express.Router();

// @route GET api/profile
// @desc Get profile for current user
// @access Private
router.get("/", requireLogin(), (req, res) => {
  profileService
    .getUserProfile({ userId: req.user.id })
    .then(profile => res.json(profile))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route POST api/profile
// @desc Create/Edit profile for current user
// @access Private
router.post("/", requireLogin(), (req, res) => {
  const { user, body } = req;

  const { errors, isValid } = validateProfileInput(body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  profileService
    .createProfile(user.id, body)
    .then(profile => res.json(profile))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route GET api/profile/handle/:handle
// @desc Get the profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
  profileService
    .getUserProfile({ handle: req.params.handle })
    .then(profile => res.json(profile))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route GET api/profile/user/:user_id
// @desc Get the profile by user_id
// @access public
router.get("/user/:user_id", (req, res) => {
  profileService
    .getUserProfile({ userId: req.params.user_id })
    .then(profile => res.json(profile))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route GET api/profile/all
// @desc Get all profile by handle
// @access public
router.get("/all", (req, res) => {
  profileService
    .getUserProfile({ all: true })
    .then(profile => res.json(profile))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route POST api/experience
// @desc Add experience to profile for the current user
// @access private
router.post("/experience", requireLogin(), (req, res) => {
  const {
    user,
    body: { title, company, location, from, to, current, description }
  } = req;
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  const { errors, isValid } = validateExperienceInput(newExperience);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: user.id })
    .then(profile => {
      profile.experience.unshift(newExperience);
      profile.save().then(newProfile => {
        res.json(newProfile);
      });
    })
    .catch(error => {
      errors.serverError = "Something went wrong";
      return res.status(500).json(errors);
    });
});

// @route POST api/education
// @desc Add education to profile for the current user
// @access private
router.post("/education", requireLogin(), (req, res) => {
  const {
    user,
    body: { school, degree, fieldofstudy, from, to, current, description }
  } = req;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  const { isValid, errors } = validateEducationInput(newEducation);
  Profile.findOne({ user: user.id }).then(profile => {
    if (!isValid) {
      return res.status(400).json(errors);
    }

    profile.education.unshift(newEducation);
    profile
      .save()
      .then(newProfile => {
        return res.json(newProfile);
      })
      .catch(error => {
        errors.serverError = "Something went wrong";
        return res.status(500).json(errors);
      });
  });
});

// @route DELETE api/profile
// @desc DELETE the profile for the current user
// @access private
router.delete("/", requireLogin(), (req, res) => {
  const { user } = req;
  Profile.findOneAndRemove({ user: user.id }).then(() => {
    User.findOneAndRemove({ _id: user.id }).then(() => {
      return res.json({ success: true });
    });
  });
});

// @route DELETE api/experience/:experience_id
// @desc DELETE experience from profile
// @access private
router.delete("/experience/:experience_id", requireLogin(), (req, res) => {
  const {
    user,
    params: { experience_id }
  } = req;
  Profile.findOne({ user: user.id }).then(profile => {
    if (!profile || profile.length === 0) {
      errors.noProfile = "there is no profile for this user";
      return res.status(404).json(errors);
    }

    const updatedExp = profile.experience.filter(exp => {
      return exp.id !== experience_id;
    });

    profile.experience = updatedExp;
    profile
      .save()
      .then(newProfile => res.send(newProfile))
      .catch(error => {
        errors.serverError = "Something went wrong";
        return res.status(500).json(errors);
      });
  });
});

// @route DELETE api/profile/education
// @desc DELETE education to profile for the current user
// @access private
router.delete("/education/:education_id", requireLogin(), (req, res) => {
  const {
    user,
    params: { education_id }
  } = req;
  Profile.findOne({ user: user.id }).then(profile => {
    if (!profile || profile.length === 0) {
      errors.noProfile = "there is no profile for this user";
      return res.status(404).json(errors);
    }

    const updatedEducation = profile.education.filter(edu => {
      return edu.id !== education_id;
    });

    profile.education = updatedEducation;
    profile
      .save()
      .then(newProfile => {
        return res.json(newProfile);
      })
      .catch(error => {
        errors.serverError = "Something went wrong";
        return res.status(500).json(errors);
      });
  });
});

module.exports = router;
