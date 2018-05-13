const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const app = express();

// db config
mongoose
  .connect(keys.mongoURI)
  .then(connection => {
    console.log("connect to mongodb");
  })
  .catch(error => {
    console.log("error:: ", error);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app listen to " + PORT);
});
