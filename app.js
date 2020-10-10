const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get(['/healthcheck', '/api/healthcheck'], (req, res) => {
    return res.status(200).json({ status: 'OK', now: new Date(), NODE_ENV: process.env.NODE_ENV });
});

app.use('/', homeRouter);


module.exports = app;
