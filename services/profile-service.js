const _ = require("lodash");
const validateProfileInput = require("../validations/profile");
const validateExperienceInput = require("../validations/experience");
const validateEducationInput = require("../validations/education");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Profile.findOne({ user: user.id })
//     .populate("user", ["name", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noProfile = "There is no profile for this user";
//         return res.status(404).json(errors);
//       }
//       return res.json(profile);
//     })
//     .catch(error => {
//       return res.status(404).json(error);
//     });
class ProfileService {
  getUserProfile({ userId, handle }) {
    const query = userId
      ? Profile.findOne({ user: userId })
      : Profile.findOne({ handle });
    return query
      .populate("user", ["name", "avatar"])
      .exec()
      .then(profile => {
        if (!profile) {
          return new Promise((resolve, reject) => {
            reject({
              noProfile: "There is no profile for this user",
              code: 404
            });
          });
        }

        return profile;
      });
  }

  _mapPropertyToFields(fields, reqBody, fieldNames) {
    fieldNames.forEach(name => {
      if (_.has(reqBody, name)) {
        fields[name] = reqBody[name];
      }
    });

    return fields;
  }

  _mapSkillToFields(fields, reqBody) {
    if (_.has(reqBody, "skills")) {
      fields.skills = reqBody.skills.split(",").map(skill => skill.trim());
    }
    return fields;
  }

  _mapSocialToFields(fields, reqBody, socialNames) {
    socialNames.forEach(name => {
      if (_.has(reqBody, name)) {
        fields.social[name] = reqBody[name];
      }
    });
    return fields;
  }

  createProfile(userId, reqBody) {
    let fields = {
      user: userId,
      social: {}
    };

    fields = this._mapPropertyToFields(fields, reqBody, [
      "handle",
      "company",
      "website",
      "location",
      "bio",
      "status",
      "githubusername"
    ]);

    fields = this._mapSkillToFields(fields, reqBody);
    fields = this._mapSocialToFields(fields, reqBody, [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ]);
    console.log(fields);
    return Profile.findOne({ user: userId }).then(profile => {
      if (profile) {
        // updating existing profile

        return Profile.findOneAndUpdate(
          { user: userId },
          { $set: fields },
          { new: true }
        ).then(updatedProfile => {
          return updatedProfile;
        });
      }
      return Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          return new Promise((resolve, reject) => {
            reject({
              handle: "This handle has already exist",
              code: 400
            });
          });
        }
        return new Profile(fields).save().then(savedProfile => {
          return res.json(savedProfile);
        });
      });
    });
  }
}

module.exports = ProfileService;
