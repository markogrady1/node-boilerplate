const express = require('express');
const path = require('path');
const homeRouter = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', homeRouter);

module.exports = app;
