const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

function verifyAdminToken(req, res, next) {
  const token = req.cookies.isAdmin;
  if (!token) {
    return res.status(403).send("No isAdmin cookie found");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded && decoded.isAdmin) {
      req.isAdmin = true; // Attach the isAdmin status to the request object
      next();
    } else {
      res.status(403).send("User is not an admin");
    }
  } catch (error) {
    res.status(403).send("Invalid isAdmin cookie");
  }
}

module.exports = verifyAdminToken;
