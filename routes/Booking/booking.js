const { Template } = require('ejs');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const db = require('../../modules/mysql_config');

const upload = multer()

router.route('/user/:id')

  .get(async(req, res, next)=> {
    const id = req.params.id;
    const sql = "SELECT * FROM cart_exhibition  WHERE user_id = ? ORDER BY cartExID DESC;"
    const [datas] = await db.query(sql,[id]);
    res.json(datas);
})

router.route('/')
    .get(async(req, res, next)=> {
        const sql = "SELECT * FROM cart_exhibition ORDER BY cartExID DESC";
        const [datas] = await db.query(sql);
        res.json(datas);
    })
    .post(upload.none(),async (req,res,next)=>{
        const sql = "INSERT INTO cart_exhibition(cartExID,cartExTitle,cartExStart,cartExEnd,cartExImage,cartExBuyTime,cartExPrice,cartExCount,cartExCategory,cartExMuseum,user_id) VALUES ?";       
        // const [datas] = await db.query(sql,[req.body.cartExID,req.body.cartExTitle,req.body.cartExStart,req.body.cartExEnd,req.body.cartExImage,req.body.cartExBuyTime,req.body.cartExPrice,req.body.cartExCount,req.body.cartExCategory]);

        console.log(req.body)
        const temp = req.body
        const output = []
        for(let i=0;i<temp.length;i++){
            output.push(
                [
                    temp[i].cartExID,
                    temp[i].cartExTitle,
                    temp[i].cartExStart,
                    temp[i].cartExEnd,
                    temp[i].cartExImage,
                    temp[i].cartExBuyTime,
                    temp[i].cartExPrice,
                    temp[i].cartExCount,
                    temp[i].cartExCategory,
                    temp[i].cartExMuseum,
                    temp[i].user_id,
                ]
            )
        }
        const [datas] = await db.query(sql,[output]);        
        res.send('新增資料');
    })



module.exports = router;
