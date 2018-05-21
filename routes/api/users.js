const express = require("express");
const _ = require("lodash");
const requireLogin = require("../../passport/require-login");
const UserService = require("../../services/user-service");
const userService = new UserService();
const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  const errors = userService.checkRegisterInvalid(req.body);

  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  userService
    .registerUser(email, password, name)
    .then(user => res.json(user))
    .catch(errors => res.status(errors.code || 500).json(errors));
});

// @route GET api/users/login
// @desc Login user / return JWT
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const errors = userService.checkLoginInvalid(req.body);

  if (!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  userService
    .loginUser(email, password)
    .then(token => res.json({ success: true, token }))
    .catch(errors => res.status(errors.code || 500).json(errors));
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
