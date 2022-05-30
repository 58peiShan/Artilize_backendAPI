var express = require('express');
const { route } = require('../categories');
var router = express.Router();
const db = require('../../modules/mysql_config');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('User');
});



module.exports = router;
