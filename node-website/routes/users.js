var express = require('express');
var router = express.Router();

const User = require("../models/User.js");

/* GET users for test pourposes */
router.get('/', async(req, res) =>{
  const allUsers = await User.query().select('username');
  res.send({response: allUsers});
});

module.exports = router;
