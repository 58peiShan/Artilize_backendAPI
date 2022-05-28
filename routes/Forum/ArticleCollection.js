const express = require("express");
const router = express.Router();
const db = require("../../modules/mysql_config");
const multer = require("multer");

router.route("/:userID").post(async (req, res, next) => {
      const id = req.body.userID;
      const sql = `SELECT * FROM blog_article_like 
      JOIN users ON blog_article_like.user_id = users.id 
      JOIN blog_article ON blog_article_like.article_id = blog_article.article_id
      WHERE blog_article_like.user_id = ?`
      const [datas] = await db.query(sql, [id]);
      res.send(datas);
})

router.route("/add").post((req, res, next) => {
      if (req.body) {
            const sql = "INSERT INTO `blog_article_like` (`user_id`, `article_id`) VALUES (?, ?)"
            const id = req.body.userId
            const articleid = req.body.articleId
            console.log(req.body);
            console.log(req.body.articleId);
            const [datas] = db.query(sql, [id, articleid]);
            res.json(datas)
      };
})


module.exports = router;