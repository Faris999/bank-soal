require('dotenv').config();

import express, { ErrorRequestHandler } from 'express'
var createError = require('http-errors');
import path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./routes/api');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static('./client/build'));
app.use('/api', apiRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

let errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

app.use(errorHandler);

module.exports = app;