const validateToken = require("../services/util");

/**
 * Middleware to validate the token and check if the user is authorized.
 */
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = validateToken(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.user = decodedToken; // Attach decoded token to the request
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Token validation failed");
  }
};

/**
 * Middleware to check if the user is an admin.
 */
const authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Forbidden: Admins only");
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
