const User = require("../database.js");
const passport = require("passport");

const registerUser = async (req, res, name, email, password) => {
  const Users = new User({ username: name, email: email });

  console.log(Users);
  await User.register(Users, password, function (err, user) {
    if (err) {
      console.log(err.message);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/tournaments");
      });
    }
  });
};

module.exports = registerUser;
