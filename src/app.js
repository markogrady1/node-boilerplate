const express = require('express');
const config = require('config');
const hbs = require('hbs');
const helmet = require('helmet');
const logger = require('morgan');
const Promise = require('bluebird');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");

const homeRouter = require('../routes/home');
const log = require('../config/logger');

logger.token('myurl', req => {
    return req.myurl || req.originalUrl;
});

logger.token('reqid', req => req.reqid);

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(helmet()); // noSniff, xssFilter etc
app.use(cors());
console.log(path.join(__dirname, '../public'))
app.use(express.static(path.join(__dirname, '../public')));
// view engine setup
const registerPartials = Promise.promisify(hbs.registerPartials, {
    context: hbs
});

registerPartials('views/partials/');
hbs.registerHelper('json', context => {
    return JSON.stringify(context);
});

app.set('views', './views');
app.set('view engine', 'hbs');

const version = config.get('version');
app.use((req, res, next) => {
  req.version = version;
  res.set('Server', `NEWAPP ${version}`);

  req.reqid =
      'NEWAPP' +
      Math.random()
          .toString(36)
          .substr(2, 9);
  res.set('X-Request-Id', req.reqid);
  next();
});

app.use(
  logger(
      ':remote-addr - - [:date[clf]] ":method :myurl HTTP/:http-version" :status :res[content-length] :response-time ":reqid"',
    { stream: log.stream }
  )
);

app.get(['/healthcheck', '/api/healthcheck'], (req, res) => {
    return res.status(200).json({ status: 'ok', version: req.version, NODE_ENV: process.env.NODE_ENV });
});

app.use('/', homeRouter);

// throw 404 if no data
app.use((req, res, next) => {
    res.status(404).send();
    next();
});

const port = process.env.PORT || config.get('port');

app.listen(port, () =>
  log.info(`Listening on port: ${port} - [${process.env.NODE_ENV}]`)
);

module.exports = app;
