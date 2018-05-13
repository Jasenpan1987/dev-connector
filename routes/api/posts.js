const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "posts route works" });
});

module.exports = router;
