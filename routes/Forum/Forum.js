const express = require("express");
const router = express.Router();
const db = require("../../modules/mysql_config");
const multer = require("multer");

router.route("/")
  .get(async (req, res, next) => {
    const sql = "SELECT * FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn JOIN`users` ON blog_article.users_id = users.id";
    const [datas] = await db.query(sql);
    res.json(datas);
  })

router.route("/category")
  .get(async (req, res, next) => {
    const sql =
      "SELECT thema FROM blog_category";
    const [datas] = await db.query(sql);
    res.json(datas);
  })

router.route("/addarticle").post((req, res, next) => {
  // const sql =
  //   "INSERT INTO blog_article(title,content,created_time,category) VALUES (?,?,{Date.now()},?)";
  // // const [datas] = await db.query(sql,[req.body]);
  // const [datas] = await db.query(sql, [
  //   req.body.title,
  //   req.body.content,
  //   req.body.created_time,
  //   red.body.category,
  // ]);
  // console.log(datas);
  res.send("新增資料");
});


router.route("/Btn").get(async (req, res, next) => {
  res.json(["好展推薦", "小資攻略", "閒聊交流", "心得分享"]);
});

//個別文章
router.route("/:id").get(async (req, res, next) => {
  const id = req.params.id;
  const sql =
    "SELECT * FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn JOIN`users` ON blog_article.users_id = users.id WHERE article_id=?";
  const datas = await db.query(sql, [id]);
  console.log(datas);
  res.json(datas[0][0]);
});

module.exports = router;