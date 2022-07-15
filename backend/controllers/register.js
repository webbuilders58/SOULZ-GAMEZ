const User = require("../database.js");
const passport = require("passport");
const emailValidator = require("email-validator");

const emailValidate = (email) => {         // checking if the given email is valid
  if (emailValidator.validate(email)) {
    return true;
  } else {
    return false;
  }
};

const registerUser = async (req, res, name, email, password) => {
  const Users = new User({ username: name, email: email });

  console.log(Users);
  await User.register(Users, password, function (err, user) {
    if (err) {
      res.render("login", { message: err.message }); //gives a message if the user already registered
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/tournaments");
      });
    }
  });
};

checkUserName = (req, res) => {
  User.findOne(
    //checking if the username is taken
    { username: req.body.username },
    function (err, docs) {
      if (err) {
        console.log(err.message);
        res.render("/register", { message: "" });
      } else {
        if (docs) {
          console.log("User with this username exists: ", docs);
          res.render("register", {
            message: "This username is taken please try again",
          });
        } else {
          checkEmailExists(req, res); //checking if the email is already registered
        }
      }
    }
  );
};

const checkEmailExists = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("/register", { message: "" });
    } else {
      if (user) {
        //  console.log("user with this email already  ", user);
        res.render("register", {
          message: "This email is already registered ",
        });
      } else {
        if (emailValidate(req.body.email)) {
          registerUser(
            req,
            res,
            req.body.username,
            req.body.email,
            req.body.password
          );
        }else{
          res.render("register",{message:"Invalid email"})
        }
      }
    }
  });
};
module.exports = checkUserName;
