var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index.route');
const productsRouter = require('./routes/products.route');
const cartsRouter = require('./routes/carts.route');
const usersRouter = require('./routes/users.route');
// const wishlistsRouter = require('./routes/wishlists.route');

// const middlewares = require('./middlewares/auth.middleware');

var app = express();

// mongoose conection
const { mongooseConnection } = require('./connection/mongoose.connection');
mongooseConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', cartsRouter);
app.use('/users', usersRouter);
// app.use('/wishlist', middlewares.auth_verification, wishlistsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
