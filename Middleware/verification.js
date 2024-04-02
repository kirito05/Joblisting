const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ errorMessage: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = verified.id;
    next();
  } catch (err) {
    res.status(400).json({ errorMessage: "Invalid Token" });
  }
};

module.exports = verifyToken;
