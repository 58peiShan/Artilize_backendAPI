const express = require("express");
const router = express.Router();
const db = require("../../modules/mysql_config");
const multer = require("multer");

router.route("/:userID").post(async (req, res, next) => {
const id = req.body.userID;
console.log(req.body.userID);
const sql = `SELECT * FROM blog_article_like 
      JOIN users ON blog_article_like.user_id = users.id 
      JOIN blog_article ON blog_article_like.article_id = blog_article.article_id 
      WHERE blog_article_like.user_id = ?`
const [datas] = await db.query(sql, [id]);
       res.send(datas);
      })

module.exports = router;