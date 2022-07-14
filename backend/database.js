const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport")


// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  googleId:String

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());


module.exports = User