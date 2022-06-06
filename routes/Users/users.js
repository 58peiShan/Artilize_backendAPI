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
  const sql = "SELECT userAccount,userAddress,userAvatar,DATE_FORMAT(userBirthday,'%Y-%m-%d') AS userBirthday,userEmail,userGender,userMobile,userName,userNickName FROM users WHERE userId=?"
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
  const sql1 = `SELECT Count(*) as total FROM users WHERE userAccount=?`
  const [datas1] = await db.query(sql1,[userAccount])
  console.log(datas1[0].total)
  const sql2 = 'SELECT Count(*) as total FROM users WHERE userEmail=?'
  const [datas2] = await db.query(sql2,[userEmail])
  console.log(datas2[0].total)
  if(datas1[0].total > 0){
     ouput.message ='已有此帳號'
    res.json(ouput)
  }else if(datas2[0].total>0){
      ouput.message = '已有此Email'
      res.json(ouput)
  }else{

    const sql = "INSERT INTO users(userAccount,userPassword,userEmail) VALUES(?,?,?)"
    
    const [datas] = await db.query(sql,[userAccount,userPassword,userEmail])
    console.log(datas)
    if(datas.affectedRows === 1){
      ouput.ok = true
    }
    res.json(ouput);
  }

 
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
  const sql1 = 'SELECT Count(userAccount) as total FROM users WHERE userAccount=?'
  const[datas1] = await db.query(sql1,[userAccount])
  console.log(datas1[0].total)

  
  if(datas1[0].total===0){
    output.message='無此帳號或帳號輸入錯誤'
    res.json(output)
  }else{
    const sql = 'SELECT userId,userAccount,userPassword,userAvatar FROM users WHERE userAccount=? and userPassword=?'
    const [datas] =  await db.query(sql,[userAccount,userPassword])
    console.log(datas)
    if(datas.length>0){
      output.ok = true
      output.userId = datas[0].userId
      output.userAvatar = datas[0].userAvatar
  
      console.log(output)
      res.json(output)
   }else if(datas.length===0){
     console.log(output)
     output.message='密碼輸入錯誤'
     res.json(output)
   }
  
  }
 
 

})

//編輯
router.put('/edit',upload.none(),async(req,res,next)=>{
  try {
    let output = {
      ok:false
    }
    // console.log(req.body)
    const response = JSON.parse(JSON.stringify(req.body))
    console.log(response)
    const{userName,userMobile,userAddress,userNickName,userBirthday,userGender,userAvatar} = response
    const sql = "UPDATE users SET userName=?,userMobile=?,userAddress=?,userNickName=?,userBirthday=?,userGender=?,userAvatar=? WHERE userId=?"
    const [datas] = await db.query(sql,[userName,userMobile,userAddress,userNickName,userBirthday,userGender,userAvatar,req.query.id])
    const sql1 = "SELECT userAvatar from users where userId=?"
    const [datas1] = await db.query(sql1,req.query.id)
    console.log(datas1[0])
    if(datas.affectedRows ===1){
      output.ok = true
      output.userAvatar = datas1[0].userAvatar
    }
    // console.log(req.query.id)
    res.json(output)
    
  } catch (error) {
    console.log(error)
  }

})

//上傳圖片
const ext = {
  'image/jpeg':'.jpg',
  'image/png':'.png',
  'image/gif':'.gif',
}
const path= require("path")
const storage = multer.diskStorage({
  destination:(req,file,callBack)=>{
    callBack(null,'./public/images')
  },
  filename:(req,file,callBack)=>{
    callBack(null, new Date().getTime() + ext[file.mimetype])
  }
})
const fileFilter = (req,file,cb)=>{ 
  cb(null, !!ext[file.mimetype]);
}
const uploadImage = multer({storage, fileFilter});

router.post('/uploadImage',uploadImage.single("file"),async (req,res,next)=>{
  try {
    let output ={ok:false}
    if(req.file === undefined){
      res.json(output)
    }else{
      const response = (JSON.parse(JSON.stringify(req.file)))
      const {filename} = response
      output.ok = true
      output.filename = filename
      res.json(output)
  
    }
  } catch (error) {
    console.log(error)
  }
  // console.log(JSON.parse(JSON.stringify(req.body)))
  // console.log(JSON.parse(JSON.stringify(req.file)))

})

router.post('/changePassword',upload.none(),async(req,res,next)=>{
  try {
    let output = {
      ok:false
    }
    // console.log(req.query.userId)
    // console.log(req.body)
    const{oldPassword,newPassword,confirmNewPassword} =req.body
    // console.log(oldPassword)
    const sql = "SELECT COUNT(userPassword) AS total FROM users WHERE userPassword=? and userId=? "
    const [datas] = await db.query(sql,[oldPassword,req.query.userId])
    // console.log(datas[0].total)
    if(datas[0].total === 0){
      res.json(output)
    }else if(datas[0].total >0){
      const sql2 = "UPDATE users SET userPassword=? WHERE userId=?"
      const [datas1] = await db.query(sql2,[newPassword,req.query.userId])
      console.log(datas1)
      output.ok = true
      res.json(output)
    }

  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
