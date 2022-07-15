require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/register.js");
const authRoute = require("./routes/auth.js");
const tournamentRoute = require("./routes/tournaments.js");
const logoutRoute = require("./routes/logout.js");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
require("./auth.js");
const User = require("./database.js");

const app = express();
// app.use(express.bodyParser());

app.set("view engine", "ejs");
app.set("views", "../frontend/views");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/auth/google", authRoute);
app.use("/tournaments", tournamentRoute);
app.use("/logout", logoutRoute);
app.use("/success", tournamentRoute);

//Database connection
const CONNECTION_URL = process.env.CONNECTION_URL;
const connection = async () => {
  await mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connection();

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

// app.use(cors());
