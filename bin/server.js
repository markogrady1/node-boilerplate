/* eslint-disable no-unused-expressions */
const config = require('config');
const hbs = require('hbs');
const helmet = require('helmet');
const Promise = require('bluebird');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v1: uuid } = require('uuid');

const log = require('../config/logger');

const app = require('../app');

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.use(helmet()); // noSniff, xssFilter etc
app.use(cors());
// view engine setup
const registerPartials = Promise.promisify(hbs.registerPartials, {
  context: hbs,
});

registerPartials('views/partials/');
hbs.registerHelper('json', (context) => JSON.stringify(context));

app.set('views', './views');
app.set('view engine', 'hbs');

const version = config.get('version');
app.use((req, res, next) => {
  req.version = version;
  res.set('Server', `NEWAPP ${version}`);

  req.reqid = uuid();
  res.set('X-Request-Id', req.reqid);
  next();
});

// throw 404 if no data
app.use((req, res, next) => {
  res.status(404).send();
  next();
});

const port = process.env.PORT || config.get('port');

process.env.NODE_ENV !== 'test' && app.listen(port, () => log.info(`Listening on port: ${port} - [${process.env.NODE_ENV}]`));

module.exports = app;
