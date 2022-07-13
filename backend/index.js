require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/register.js");
const passport = require("passport");
// const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
// const passportLocalMongoose = require("passport-local-mongoose");
require("./auth.js");

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/");
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", loginRoute);
app.use("/register", registerRoute);

//Database connection
const CONNECTION_URL = process.env.CONNECTION_URL;
const connection = async () => {
  await mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connection();
// mongoose.set("useCreateIndex", true);

//database connection

app.get("/success", (req, res) => {
  res.send("Successfully logged in");
});

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

app.get("/tournaments", isLoggedIn, (req, res) => {
  res.send("Protected Route");
});

app.get("/logout", (req, res) => {
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
  res.redirect("/")

  // req.session = null;
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

// app.use(cors());
