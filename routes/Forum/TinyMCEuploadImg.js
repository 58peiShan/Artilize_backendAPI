var express = require('express');
var router = express.Router();
const db = require('../../modules/mysql_config');

router.get('/', function (req, res, next) {
    res.send('Tiny');
});



module.exports = router;