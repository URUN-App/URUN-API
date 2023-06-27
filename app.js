var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("./config/mongoose");

//router
const apiRouter = require("./routes/api/general.router");

//CORS
const cors = require("cors");

var app = express();
mongoose.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use("/api", apiRouter);



module.exports = app;
