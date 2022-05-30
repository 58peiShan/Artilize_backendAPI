const express = require('express')
const router = express.Router()
const db = require('../../modules/mysql_config')

router.get('/', function (req, res, next) {
  res.send('FORUM')
})

module.exports = router
