var express = require('express');
const { route } = require('../categories');
var router = express.Router();
const db = require('../../modules/mysql_config');
const multer = require('multer');
const upload = multer();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('User');
});

router.post('/signup',upload.none(), async function (req, res, next) {
  let ouput = {
    ok:false
  }
  let data = JSON.parse(JSON.stringify(req.body))
  const{userAccount,userEmail,userPassword} = data
  const sql = "INSERT INTO users(userAccount,userPassword,userEmail) VALUES(?,?,?)"
  const [datas] = await db.query(sql,[userAccount,userEmail,userPassword])
  console.log(datas)
  if(datas.affectedRows === 1){
    ouput.ok = true
  }
  res.json(ouput);
 
});



module.exports = router;
