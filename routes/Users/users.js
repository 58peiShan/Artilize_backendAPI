var express = require('express');
const { route } = require('../categories');
var router = express.Router();
const db = require('../../modules/mysql_config');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('User');
});




// 個人主頁文章顯示-佩珊
router.route("/personalpage")
  .post(async (req, res, next) => {
    const id = req.body.userID;
    //console.log(`目前登入使用者id=${id}`);
    const sql = "SELECT article_id, title, created_time, content, users_id, thema, nickname, username FROM blog_article JOIN `blog_category` ON blog_article.category = blog_category.sn JOIN`users` ON blog_article.users_id = users.id WHERE users_id = ? ORDER BY `blog_article`.`created_time` DESC";
    const datas = await db.query(sql, [id]);
    res.json(datas[0]);
  })


module.exports = router;
