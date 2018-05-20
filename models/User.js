const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

UserSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      this.password = hashedPassword;
      this.avatar = gravatar.url(this.email, { s: "200", r: "pg", d: "mm" });
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User = mongoose.model("users", UserSchema);
