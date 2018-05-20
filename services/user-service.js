const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");
const User = require("../models/User");
const { signJWT } = require("../helpers");

class UserService {
  checkRegisterInvalid(registerInputBody) {
    const { errors, isValid } = validateRegisterInput(registerInputBody);
    if (!isValid) {
      return errors;
    }
    return false;
  }

  checkLoginInvalid(loginInputBody) {
    const { errors, isValid } = validateLoginInput(loginInputBody);
    if (!isValid) {
      return errors;
    }
    return {};
  }

  registerUser(email, password, name) {
    return User.findOne({ email }).then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          reject({ email: "email has been taken", code: 400 });
        });
      }

      return new User({ email, password, name }).save();
    });
  }

  loginUser(email, password) {
    return User.findOne({ email }).then(user => {
      if (!user) {
        return new Promise((resolve, reject) => {
          reject({ email: "user email not found", code: 400 });
        });
      }

      return user.comparePassword(password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          return signJWT(payload);
        }

        return new Promise((resolve, reject) => {
          reject({ password: "password incorrect", code: 400 });
        });
      });
    });
  }
}

module.exports = UserService;
