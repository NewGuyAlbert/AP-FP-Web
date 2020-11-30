var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/signup", (req, res) => {
  res.render('signup/signup');
});

router.get("/login", (req, res) => {
  res.render('login/login');
});

module.exports = router;
