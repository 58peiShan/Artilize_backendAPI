var express = require('express');
var router = express.Router();
const db = require('../../modules/mysql_config');

router.get('/', async function (req, res, next) {
    const sql = `SELECT * from exhibition`
    const [datas] = await db.query(sql);
    res.json(datas);
    console.log(datas)
});



module.exports = router;
