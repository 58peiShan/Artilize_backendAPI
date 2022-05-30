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

router.route("/add")
      .get(async (req, res, next) => {
            console.log('addGET');
            const sql = "select * from blog_article_like"
            const [datas] = await db.query(sql)
            console.log(datas);
            res.json(datas)
      })
      .post(async (req, res, next) => {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
            //const sql = "SELECT * FROM `blog_article_like`"
            // const sql = "INSERT INTO `blog_article_like` (`like_id`,`user_id`, `article_id`) VALUES (NULL,?, ?)"
            const [datas] = req.body
            // const articleid = req.body.article
            // const datas = await db.query(sql, [id, articleid])
            // console.log(datas);
            // console.log(`addString  ${datas}`);

            res.json(datas)
      })

router.route("/remove").delete(async (req, res, next) => {
      const sql = "DELETE FROM blog_article_like WHERE `article_id` = ? AND user_id =?"
      const article = req.body.article
      const id = req.body.id
      console.log(req.body)
      const [datas] = await db.query(sql, [article, id]);
      res.send(datas)
})


module.exports = router;