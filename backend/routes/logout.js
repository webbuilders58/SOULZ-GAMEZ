const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });
  const sessionID = req.session.id;
  req.sessionStore.destroy(sessionID, (err) => {
    // callback function. If an error occurs, it will be accessible here.
    if (err) {
      return console.error(err);
    }
    console.log("The session has been destroyed!");
  });
  res.redirect("/");
});

module.exports = router;
