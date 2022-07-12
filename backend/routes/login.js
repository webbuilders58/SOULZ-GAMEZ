const express = require("express");
const router = express.Router();
const loginPage = require("../controllers/loginPage.js")

router.use((req, res, next) => {
  next();
});

router.get("/", loginPage.getLogin);

router.post("/", loginPage.postLogin);

module.exports = router;
