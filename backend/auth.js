const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate")
const User = require("./database.js")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value);
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName,email:profile.emails[0].value},
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);
