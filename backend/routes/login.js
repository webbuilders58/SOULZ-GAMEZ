const express = require("express");
const router = express.Router();
const User = require("../database.js");
const passport = require("passport");
var bodyParser = require("body-parser");
const loginUser = require("../controllers/login.js")

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.render("login", { message: "" });
});

router.post("/", (req, res) => {
  loginUser(req,res)
  
});

module.exports = router;
