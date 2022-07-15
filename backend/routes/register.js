const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/register.js");
const User = require("../database.js");
const passport = require("passport");

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.render("register", { message: "" });
});

router.post("/",  (req, res) => {

registerUser(req,res)
   
});


module.exports = router;
