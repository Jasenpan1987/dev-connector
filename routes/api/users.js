const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");
const router = express.Router();
// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "user route works" });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email has been taken" });
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
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
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
        return res.status(400).json({ password: "password incorrect" });
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
