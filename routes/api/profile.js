const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// get models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validations/profile");
const validateExperienceInput = require("../../validations/experience");
const validateEducationInput = require("../../validations/education");
const router = express.Router();

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "profile route works" });
});

// @route GET api/profile
// @desc Get profile for current user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;
    const errors = {};
    Profile.findOne({ user: user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(error => {
        return res.status(404).json(error);
      });
  }
);

// @route POST api/profile
// @desc Create/Edit profile for current user
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;

    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = user.id;

    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }

    if (req.body.company) {
      profileFields.company = req.body.company;
    }

    if (req.body.website) {
      profileFields.website = req.body.website;
    }

    if (req.body.location) {
      profileFields.location = req.body.location;
    }

    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }

    if (req.body.status) {
      profileFields.status = req.body.status;
    }

    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }

    if (req.body.skills) {
      profileFields.skills = req.body.skills
        .split(",")
        .map(skill => skill.trim());
    }

    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    Profile.findOne({ user: user.id }).then(profile => {
      if (profile) {
        // update profile
        Profile.findOneAndUpdate(
          { user: user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => {
          return res.json(updatedProfile);
        });
      } else {
        // create profile
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle has already exist";
            res.status(400).json(errors);
          } else {
            new Profile(profileFields).save().then(savedProfile => {
              return res.json(savedProfile);
            });
          }
        });
      }
    });
  }
);

// @route GET api/profile/handle/:handle
// @desc Get the profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const { handle } = req.params;
  const errors = {};
  Profile.findOne({ handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "there is no profile for this user";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(error => {
      errors.serverError = "Something went wrong";
      return res.status(500).json(errors);
    });
});

// @route GET api/profile/user/:user_id
// @desc Get the profile by user_id
// @access public
router.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  const errors = {};
  Profile.findOne({ user: user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "there is no profile for this user";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(error => {
      errors.serverError = "Something went wrong";
      return res.status(500).json(errors);
    });
});

// @route GET api/profile/all
// @desc Get all profile by handle
// @access public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles || profiles.length === 0) {
        errors.noProfile = "there is no profile for this user";
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch(error => {
      errors.serverError = "Something went wrong";
      return res.status(500).json(errors);
    });
});

// @route POST api/experience
// @desc Add experience to profile for the current user
// @access private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
    console.log("newExperience:: ", newExperience);

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
  }
);

// @route POST api/education
// @desc Add education to profile for the current user
// @access private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// @route DELETE api/profile
// @desc DELETE the profile for the current user
// @access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;
    Profile.findOneAndRemove({ user: user.id }).then(() => {
      User.findOneAndRemove({ _id: user.id }).then(() => {
        return res.json({ success: true });
      });
    });
  }
);

// @route DELETE api/experience/:experience_id
// @desc DELETE experience from profile
// @access private
router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// @route DELETE api/profile/education
// @desc DELETE education to profile for the current user
// @access private
router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

module.exports = router;
