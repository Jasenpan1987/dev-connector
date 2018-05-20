const JWT = require("jsonwebtoken");
const keys = require("../config/keys");

function signJWT({ id, name, avatar }) {
  return new Promise((resolve, reject) => {
    JWT.sign(
      { id, name, avatar },
      keys.jwtSecret, // any string can be the key
      { expiresIn: 3600 }, // expires in seconds
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(`Bearer ${token}`);
      }
    );
  });
}

module.exports = {
  signJWT
};
