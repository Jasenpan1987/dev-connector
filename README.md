## Add /config to your root, and add a keys.js file inside it, it should have the following details

```
module.exports = {
  mongoURI: "<YOUR_MONGO_CONNECTION_STRING>",
  jwtSecret: "<ANY_SECRET_KEY_FOR_JWT>"
}
```
