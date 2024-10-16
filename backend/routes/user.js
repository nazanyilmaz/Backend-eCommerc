const express = require("express");
const { authenticationMid } = require("../middleware/auth.js");
const {
  register,
  login,
  logout,
  forgatPassword,
  resetPassword,
  userDetail,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgatPassword);
router.post("/reset/:token", resetPassword);
router.get("/me", authenticationMid, userDetail);

module.exports = router;
