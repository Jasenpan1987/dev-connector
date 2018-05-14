const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
mongoose
  .connect(keys.mongoURI)
  .then(connection => {
    console.log("connect to mongodb");
  })
  .catch(error => {
    console.log("error:: ", error);
  });

// passport middleware
app.use(passport.initialize());

// passport strategies
require("./passport/local")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app listen to " + PORT);
});
