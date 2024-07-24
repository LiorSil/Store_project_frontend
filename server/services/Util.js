const jwt = require("jsonwebtoken");

function validateToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = validateToken;
