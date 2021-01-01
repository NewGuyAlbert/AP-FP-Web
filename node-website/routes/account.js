var express = require('express');
var router = express.Router();

//Create redirect for pages that require user to be logged in
const redirectLogin = (req, res, next) => {
  if (!req.session.user){
      res.redirect('/login');
  } else {
      next()
  }
}

/* GET account page. */
router.get('/', redirectLogin, function(req, res, next) {
  res.render('account', { title: 'Account' });
});

module.exports = router;
