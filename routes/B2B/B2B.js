var express = require('express');
var router = express.Router();
const db = require('../../modules/mysql_config');
const multer = require('multer');
// const upload = multer({ dest: 'public/stylesheets/uploads/' })
// console.log(process.env.MYSQL_DB);
// console.log(process.env.MYSQL_HOST);

//上傳檔案的multer設定
const ext = {
    'image/jpeg':'.jpg',
    'image/png':'.png',
    'image/gif':'.gif',
  }
  const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null, 'public/uploads');
    },
    filename:(req,file,cb)=>{
       cb(null, new Date().getTime() + ext[file.mimetype]);
    }
  })
  const fileFilter = (req,file,cb)=>{ 
    cb(null, !!ext[file.mimetype]);
  }
  const upload = multer({storage, fileFilter});
/*****************************************************/
// const fileStorageEngine = multer.diskStorage({
//   destination:(req,file,cb)=>{
//       cb(null,'public/uploads')
//   },
//   filename:(req,file,cb)=>{
//       cb(null,Date.now()+'--'+ file.originalname)
//   },
// })
// // const fileFilter = (req,file,cb)=>{ 
// //      cb(null, !!ext[file.mimetype]);
// //    };

// const upload = multer({storage :fileStorageEngine});


  // Get http://localhost:5000/B2B/B2B
  router.route('/B2B')
  .get(async (req,res,next)=>{
        const sql = "SELECT * FROM exhibition_actadm";
        const [datas] = await db.query(sql);
       res.json(datas);
    })

  //POST http://localhost:5000/B2B/
   
     .post(upload.array("img",2),async (req,res,next)=>{ //多張圖片
   
        console.log(req.body) 
        
        // console.log(req.files[0].filename) 
        // console.log(req.files[1].filename) 
        
        //解構 req.body req.file 
        //req.body.name,req.body.date,req.body.place
        const{aName,start,end,time,intro,fkCityId,fkMuseumId,fkKindId} = req.body 
        const{name,price,introT,amount} =req.body
        //req.file.filename
        const{filename} = req.files 
        // const sql = "INSERT INTO form (name,imgA,imgB,date,place) VALUES (?,?,?,?,?)";
       const sql ="INSERT INTO exhibition_actadm(aName,pic1,pic2,start,end,time,intro,fkCityId,fkMuseumId,fkKindId)VALUES(?,?,?,?,?,now(),?,?,?,?)"
       const sql1 ="INSERT INTO exhibition_ticket(name,price,introT,amount)VALUES(?,?,?,?)"
        // const [datas] = await db.query(sql,[req.body]);
        
        const [datas] = await db.query(sql,[aName,req.files[0].filename,req.files[1].filename,start,end,intro,fkCityId,fkMuseumId,fkKindId],);
        const [datas2] = await db.query(sql1,[req.body.name,req.body.price,req.body.introT,req.body.amount],); 
        console.log(datas)
        console.log(datas2)
        console.log(req.body);
        console.log(req.file);
        res.json(req.body)
        // res.send(`上傳檔案名稱為 ${req.file.filename}`)
    })

    // GET http://localhost:5000/B2B/B2B/id
  router.route('/B2B/:id')
    .get(async (req,res,next)=>{
      console.log('req.params.id', req.params.id)
        const id = req.params.id;
        const sql = "SELECT * FROM exhibition_actadm WHERE id=?";
        const [datas] = await db.query(sql,[id]);
       res.json(datas);
      //  res.send(`讀取${id}的資料`)
    })
    .put(upload.array("img",2), async (req,res,next)=>{
        let output = {
            ok:false
        }

        // aName,pic1,pic2,start,end,time,intro,fkCityId,fkMuseumId,fkKindId
        const{aName,start,end,time,intro,fkCityId,fkMuseumId,fkKindId} = req.body
        console.log('req.body.id', req.body.id)  
        console.log('req.params.id', req.params.id)
        const id = req.params.id;
        const sql = "UPDATE exhibition_actadm SET id=?,aName=?,pic1=?,pic2=?,start=?,end=?,intro=?,fkCityId=?,fkMuseumId=?,fkKindId=? WHERE id=?";
        const sql1 ="UPDATE exhibition_ticket SET id=?,name=?,price=?,introT=?,amount=? WHERE id=?";

        const [datas] = await db.query(sql,[id,aName,req.files[0].filename,req.files[1].filename,start,end,intro,fkCityId,fkMuseumId,fkKindId,id],);
        const [datas2] = await db.query(sql1,[id,req.body.name,req.body.price,req.body.introT,req.body.amount,id],); 
        console.log(datas);
        console.log(datas2);
        if(datas.affectedRows === 1){
            output.ok = true;
         }
       res.json(output) ;
        
    })
    .delete(async (req,res,next)=>{
        let output = {
            ok:false
        }
        const id = req.params.id;
        const sql = "DELETE FROM exhibition_actadm WHERE id=?";
      
        const[datas] = await db.query(sql,[id]);
        if(datas.affectedRows === 1){
            output.ok = true;
         }
       res.json(output) ;
    })

module.exports = router;



// {
//   "aName": "測試1",
//   "start": "2022-04-02 13:16:44",
//   "end": "2022-07-14 13:16:44",
//   "intro": "李義弘：回顧展」邀請藝評學者王嘉驥擔任客座策展人，是藝術家長達55年的藝術生涯以來規模最大也最重要的一次展出。李義弘（1941-）早年曾在基隆的國民中學任教，並追隨書畫名家江兆申（1925-1996）",
//   "fkCityId": "2",
//   "fkMuseumId": "1",
//   "fkKindId": "2",
//   "name": "測試票2",
//   "price": "999",
//   "introT": "測試用",
//   "amount": "222"
// }
