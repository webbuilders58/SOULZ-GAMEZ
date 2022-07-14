const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use((req, res, next) => {
  next();
});

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

module.exports = router;
