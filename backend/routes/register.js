const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/register.js");
const User = require("../database.js");
const passport = require("passport");

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, docs) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      if (docs) {
        console.log("User already exists: ", docs);
        res.render("login",{alreadyRegistered:"You have already registered.Please Log in"})
      } else {
        registerUser(
          req,
          res,
          req.body.username,
          req.body.email,
          req.body.password
        );
      }
    }
  });
});

module.exports = router;
