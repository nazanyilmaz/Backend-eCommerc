const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authenticationMid = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(500).json({ message: "Please Login" });
  }
  const decodedData = jwt.verify(token, "SECRET_TOKEN");
  if (!decodedData) {
    return res.status(500).json({ message: "Token invalid!!" });
  }

  req.user = await User.findById(decodedData.id);
  next();
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not admin" });
    }
    next();
  };
};

module.exports = { authenticationMid, roleChecked };
