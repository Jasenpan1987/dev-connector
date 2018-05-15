const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const User = require("../../models/User");
const keys = require("../../config/keys");
const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { email, password, name } = req.body;

  // server side validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "email has been taken";
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name,
      email,
      password,
      avatar: gravatar.url(email, { s: "200", r: "pg", d: "mm" })
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
        if (error) {
          throw error;
        }
        newUser.password = hashedPassword;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(error => console.log(error));
      });
    });
  });
});

// @route GET api/users/login
// @desc Login user / return JWT
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        JWT.sign(
          payload, // payload that can include any information
          keys.jwtSecret, // any string can be the key
          { expiresIn: 3600 }, // expires in seconds
          (error, token) => {
            return res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route POST api/users/current
// @desc Returns the current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, id } = req.user;
    res.json({
      id,
      name,
      email
    });
  }
);

module.exports = router;
