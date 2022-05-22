var express = require('express');
var router = express.Router();
const db = require('../../modules/mysql_config');

router.get('/', function (req, res, next) {
    res.send('Booking');
});



module.exports = router;
