const express = require("express");
const router = express.Router();


router.use((req, res, next) => {
  next();
});

router.get("/",  (req, res) => {
  res.render("login")

});

router.post("/", (req, res) => {
  res.send("post login");
});



module.exports = router;
