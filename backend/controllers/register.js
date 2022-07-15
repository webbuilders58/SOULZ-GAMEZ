const User = require("../database.js");
const passport = require("passport");

const registerUser = async (req, res, name, email, password) => {
  const Users = new User({ username: name, email: email });

  console.log(Users);
  await User.register(Users, password, function (err, user) {
    if (err) {
      res.render("login",{message:err.message}); //gives a message if the user already registered
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/tournaments");
      });
    }
  });
};


checkUserName = (req,res) => {
  User.findOne(          //checking if the username is taken
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
          checkEmail(req,res) //checking if the email is already registered
          
        }
      }
    }
  )
}


const checkEmail =  (req,res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
   if (err) {
     console.log(err);
     res.render("/register", { message: "" });
   } else {
     if (user) {
       console.log("user with this email already  ", user);
       res.render("register", {
         message: "This email is already registered ",
       });
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
};
module.exports = checkUserName;
