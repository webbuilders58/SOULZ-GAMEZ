const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", isLoggedIn, (req, res) => {
  res.send("Protected Route");
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/");
}

module.exports = router;
