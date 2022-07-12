const express = require("express");
const router = express.Router();
const registerPage = require("../controllers/registerPage.js");

router.use((req, res, next) => {
  next();
});

router.get("/", registerPage.getRegister)

router.post("/",registerPage.postRegister)

module.exports = router;
