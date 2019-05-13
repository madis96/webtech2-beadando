const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const logger = require('morgan');

const indexRoute = require("./src/IndexController").routes;
const orderRoutes = require("./src/customerOrderController").routes;

const connectToDatabase = require('./src/Database').connectToDatabase;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/', indexRoute);
app.use('/order/', orderRoutes);

connectToDatabase();
module.exports = app;