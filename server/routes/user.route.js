const express = require("express");
const {
  handleSignupUser,
  handleSigninUser,
  handleLogout,
} = require("../controllers/manual.user.controller");

const router = express.Router();

// ✅ Pages
// GET route to show the signup form
router.get("/signup", (req, res) => {
  res.render("signup", { message: null });
});

// GET route to show the signin form
router.get("/signin", (req, res) => {
  res.render("signin", { message: null });
});

// ✅ Actions
// POST route to handle signup
router.post("/signup", handleSignupUser);

// POST route to handle signin
router.post("/signin", handleSigninUser);

// logout
router.get("/logout", handleLogout);

module.exports = router;
