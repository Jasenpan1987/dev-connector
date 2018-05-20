const express = require("express");
const requireLogin = require("../../passport/require-login");
const { signJWT } = require("../../helpers");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const User = require("../../models/User");
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
      password
    });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(error => console.log(error));
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
    user.comparePassword(password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        signJWT(payload).then(token => {
          return res.json({ success: true, token });
        });
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
router.get("/current", requireLogin(), (req, res) => {
  const { name, email, id } = req.user;
  res.json({
    id,
    name,
    email
  });
});

module.exports = router;
