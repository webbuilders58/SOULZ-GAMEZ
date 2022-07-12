const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const getLogin = (req, res) => {
  res.send("get login");
};

const postLogin = (req, res) => {
  res.send("post login");
};

//google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:/google/auth/profile",
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      User.findOrCreate(
        { googleId: profile.id, Username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

module.exports = {
  getLogin,
  postLogin,
};
