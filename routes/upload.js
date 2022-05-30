const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload')
const db = require("../modules/mysql_config");
const fs = require("fs");
const multer = require("multer");
const mime = require('mime');
const { route } = require("./Forum/ArticleCollection");
app.use(fileUpload({}));


const localDomains = ['127.0.0.1', 'localhost'];

// 檢測是否需要上傳
let test = function test(url) {
    if (url.indexOf(location.host) !== -1 || /(^\.)|(^\/)/.test(url)) {
        return !0;
    }
    // 白名單
    if (localDomains) {
        for (let domain in localDomains) {
            if (localDomains.hasOwnProperty(domain) && url.indexOf(localDomains[domain]) !== -1) {
                return !0;
            }
        }
    }
    return !1;
};


// router.route("/").get(async (req, res, next)=>{
//         var A= 1;
//         var B= 1;
//         var C= 1;
      
//         var folderName = path.join(__dirname, '../client/X-' + A);
      
//         if (!fs.existsSync(folderName)) {
//           fs.mkdir(folderName, function (err) {
//             if (err) {
//               console.log(err);
//             }
//             else {
      
//             }
//           });
//         }
//         else {
//           if (!req.files) {
//             return res.status(400).send('No files were uploaded.');
//           }
//           console.log(req.files.file.mimetype);
//           console.log(req.files.file.data.byteLength);
//           var sampleFile = req.files.file;
//           sampleFile.mv(path.join(__dirname, '../', 'client/', 'test.jpg'), function (err) {
//             var temp = path.join(__dirname, '../', 'client/', 'test.jpg');
//             mime.lookup(path.join(__dirname, '../', 'client/', 'test.jpg'));         // => 'text/plain'
//             if (err) {
//               return res.status(500).send(err);
//             }
//             res.send({ 'location': '../test.jpg' });
//           });
//         }
//       });

module.exports = router;