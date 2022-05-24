const express = require("express");
const router = express.Router();
const db = require("../../modules/mysql_config");
const multer = require("multer");
const app = require("../../app");

// 文章依分類顯示
router.route("/")
  .get(async (req, res, next) => {
    if (req.query.topic == "null") {
      //console.log('is null');
      const sql = "SELECT * FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn JOIN`users` ON blog_article.users_id = users.id ORDER BY `blog_article`.`created_time` DESC";
      const [datas] = await db.query(sql);
      res.json(datas);
    } else {
      //console.log(req.query);
      const topic = decodeURI(`${req.query.topic}`);
      const sql =
        "SELECT * FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn HAVING thema = ?";
      const [datas] = await db.query(sql, [topic]);
      res.json(datas);
    }
  })
//分類
router.route("/category")
  .get(async (req, res, next) => {
    const sql =
      "SELECT * FROM blog_category";
    const [datas] = await db.query(sql);
    res.json(datas);
  })

router.route("/addarticle").post(async (req, res, next) => {
  // if (req.body.title === "iii" && req.body.content === "555") {
  //   console.log("sugoi");
  // } else {
  //   console.log(req.body);
  // }
  if (req.body) {
    const sql =
      // "INSERT INTO `blog_article`(`title`, `content`, `created_time`, `category`, `users_id`) VALUES (?,?,'20220505',?,?);";
      "INSERT INTO `blog_article`(`title`, `content`, `created_time`, `category`, `users_id`) VALUES (?,?,NOW(),? ,6 );";
    const [datas] = await db.query(sql, [
      req.body.title,
      req.body.content,
      req.body.category,
    ]);
    res.send(datas);
  }
});


//個別文章
router.route("/:id").get(async (req, res, next) => {
  const id = req.params.id;
  const sql =
    "SELECT * FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn JOIN`users` ON blog_article.users_id = users.id WHERE article_id=?";
  const datas = await db.query(sql, [id]);
  console.log("datas");
  res.json(datas[0][0]);
});


module.exports = router;