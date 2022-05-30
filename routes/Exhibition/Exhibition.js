var express = require('express')
var router = express.Router()
const db = require('../../modules/mysql_config')
const multer = require('multer');
const upload = multer()


router.route('/categories/:id')
  .get(async (req, res, next) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM exhibition_actadm JOIN exhibition_img ON exhibition_actadm.exhibitionId = exhibition_img.actadm_id JOIN exhibition_kind ON exhibition_kind.kid = exhibition_actadm.kind_id WHERE kind_id=?"
    const [datas] = await db.query(sql,[id]);
    res.json(datas);
  })
router.route('/categories')
  .get(async (req, res, next) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM exhibition_kind"
    const [datas] = await db.query(sql);
    res.json(datas);
  })

router.route('/:id')
  .get(async (req, res, next) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM exhibition_actadm JOIN exhibition_img ON exhibition_actadm.exhibitionId = exhibition_img.actadm_id WHERE exhibitionId=?"
    const [datas] = await db.query(sql,[id]);
    res.json(datas);
  })

router.route('/')
  .get(async (req, res, next) =>{
    const sql = "SELECT * FROM exhibition_actadm JOIN exhibition_img ON exhibition_actadm.exhibitionId = exhibition_img.actadm_id"
    const [datas] = await db.query(sql);
    res.json(datas);
  })




module.exports = router
