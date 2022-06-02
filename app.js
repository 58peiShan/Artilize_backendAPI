var express = require('express');
const cors =  require("cors")
const algoliasearch = require('algoliasearch')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
// 老師的示範先留著
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
// 路由宣告
const usersRouter = require('./routes/Users/users');
const exhibitionRouter = require('./routes/Exhibition/exhibition');
const bookingRouter = require('./routes/Booking/booking');
const ForumRouter = require('./routes/Forum/Forum');
//const UploadRouter = require('./routes/Forum/upload');
const ArticleCommentRouter = require('./routes/Forum/ArticleComment');
const ArticleCollectionRouter = require('./routes/Forum/ArticleCollection');
const productRouter = require('./routes/Product/product');
const B2BRouter = require('./routes/B2B/B2B');
const NewsLetterRouter = require('./routes/newsLetter');




const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./upload/'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
//http://localhost:5000/categories
app.use('/categories', categoriesRouter);
//http://localhost:5000/products
app.use('/products', productsRouter);

// 專題路由設定
app.use('/users', usersRouter);
app.use('/exhibition', exhibitionRouter);
app.use('/booking', bookingRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/forum', ForumRouter);
//app.use('/upload', UploadRouter);
app.use('/ArticleComment', ArticleCommentRouter);
app.use('/ArticleCollection', ArticleCollectionRouter);
app.use('/NewsLetter', NewsLetterRouter);
app.use('/B2B', B2BRouter);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//Alogolia Thing
// // Connect and authenticate with your Algolia app
// const client = algoliasearch('PZOO31BWY9', process.env.ALGOLIA_API)

// // Create a new index and add a record
// const index = client.initIndex('test_index')
// const record = { objectID: 4, name: 'djoijoijsdi4' }


// index.saveObject(record).wait()

// // Search the index and print the results
// index
//   .search('lu')
//   .then(({ hits }) => console.log(hits[0]))
//   .catch((err)=>{
//       console.log(err);
//   })












module.exports = app;
