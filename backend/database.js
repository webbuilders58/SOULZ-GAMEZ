const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport")




const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  googleId:{
    require:false,
    type:String,
  }

},{timestamps:true});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);



module.exports = User
