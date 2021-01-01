var express = require('express');
var router = express.Router();

//Create redirect when user is already logged in
const redirectAccount = (req, res, next) => {
  if (req.session.user){
      res.redirect('/account');
  } else {
      next()
  }
}

/* GET home page. */
router.get('/',redirectAccount,  function(req, res, next) {
  res.render('index');
});

router.get("/signup", redirectAccount, (req, res) => {
  res.render('signup/signup');
});

router.get("/login", redirectAccount, (req, res) => {
  res.render('login/login');
});

module.exports = router;
