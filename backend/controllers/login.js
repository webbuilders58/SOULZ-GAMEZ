const express = require("express");
const router = express.Router();
const User = require("../database.js");
const passport = require("passport");

const loginUser = async(req,res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await passport.authenticate("local", function (err, user, info) {
    if (err) {
      // return next(err);
      console.log(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.render("login", { message: info.message });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // ***********************************************************************
    req.login(user, (loginErr) => {
      if (loginErr) {
        // return next(loginErr);
        console.log(loginErr);
      }
      return res.redirect("/tournaments");
      // console.log(req.user);
    });
  })(req, res);
};



module.exports = loginUser
