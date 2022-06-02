var express = require('express');
const { route } = require('../categories');
var router = express.Router();
const db = require('../../modules/mysql_config');
const multer = require('multer');
const upload = multer();

/* GET users listing. */
router.get('/', async (req, res, next)=> {
  
  console.log(req.query.userId)
  const{userId} = req.query
  const sql = 'SELECT userAccount,userAddress,userAvatar,userBirthday,userEmail,userGender,userMobile,userName,userNickName FROM users WHERE userId=?'
  const [datas] = await db.query(sql,[userId])
  console.log(datas)
  res.send(datas)
});

router.post('/signup',upload.none(), async function (req, res, next) {
  let ouput = {
    ok:false
  }
  let data = JSON.parse(JSON.stringify(req.body))
  const{userAccount,userEmail,userPassword} = data
  const sql = "INSERT INTO users(userAccount,userPassword,userEmail) VALUES(?,?,?)"
  const [datas] = await db.query(sql,[userAccount,userPassword,userEmail])
  console.log(datas)
  if(datas.affectedRows === 1){
    ouput.ok = true
  }
  res.json(ouput);
 
});

//Account 驗證
router.get('/signup/checkaccount',async function(req,res,next){
  let output = {
      canUse: false
  }
  
  const sql = `SELECT Count(*) as total FROM users WHERE userAccount=?`
  const [datas]= await db.query(sql,[req.query.name])
  // console.log(datas)
  const {total}=datas[0]
  console.log(total)
  if(total > 0){
     
     res.json(output)
  }else{
    output.canUse = true
    res.json(output)
  }
})

//Email 驗證
router.get('/signup/checkemail', async (req,res,next)=>{
    let output ={
      canUse: false
    }
    const sql = 'SELECT Count(*) as total FROM users WHERE userEmail=?'
    const [datas]= await db.query(sql,[req.query.email])
    const{total}=datas[0]
    console.log(total)
    if(total>0){
      res.json(output)
    }else{
      output.canUse = true
      res.json(output)
    }

})

//登入
router.post('/login',upload.none(),async (req,res,next)=>{
  let output={
    ok:false
  }
  const info =JSON.parse(JSON.stringify(req.body))
  //console.log(info)
  const {userAccount,userPassword}=info
  const sql = 'SELECT userId,userAccount,userPassword FROM users WHERE userAccount=? and userPassword=?'
  const [datas] =  await db.query(sql,[userAccount,userPassword])
  console.log(datas)
  
  
  if(datas.length>0){
     output.ok = true
     output.userId = datas[0].userId

     console.log(output)
     res.json(output)
  }else{
    console.log(output)
    res.json(output)
  }

})




module.exports = router;
