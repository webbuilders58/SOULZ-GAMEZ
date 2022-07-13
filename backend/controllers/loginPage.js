const passport = require("passport");

const getLogin = (req, res) => {
  res.send("get login");
};

const postLogin = (req, res) => {
  res.send("post login");
};

//google authentication
// const googleLogin =  (req, res) => {
  
//    passport.authenticate("google", { scope: ["profile"] });
// };

module.exports = {
  getLogin,
  postLogin,
  // googleLogin,
};
