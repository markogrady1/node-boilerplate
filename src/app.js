const express = require('express');
const hbs = require('hbs');
const helmet = require('helmet');
const logger = require('morgan');
const Promise = require('bluebird');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");



// const Store = require('./datastore');


const homeRouter = require('../routes/home');
// const setupRouter = require('../routes/setup');

logger.token('myurl', req => {
    return req.myurl || req.originalUrl;
});

logger.token('reqid', req => req.reqid);

module.exports = class Server {
    constructor(config) {
        this.app = express();
        this.config = config;
    }

    static bootstrap(config) {
        const server = new Server(config);
        server.init();

        return server;
    }

    async init() {

        /** bodyParser.urlencoded(options)
         * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
         * and exposes the resulting object (containing the keys and values) on req.body
         */
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        /**bodyParser.json(options)
        * Parses the text as JSON and exposes the resulting object on req.body.
        */
        this.app.use(bodyParser.json());

        this.app.use(helmet()); // noSniff, xssFilter etc
        // const store = new Store(this.config);
        this.app.use(cors());
        console.log(path.join(__dirname, '../public'))
        this.app.use(express.static(path.join(__dirname, '../public')));
        // view engine setup
        const registerPartials = Promise.promisify(hbs.registerPartials, {
            context: hbs
        });

        await registerPartials('views/partials/');
        hbs.registerHelper('json', context => {
            return JSON.stringify(context);
        });
        this.app.set('views', './views');
        this.app.set('view engine', 'hbs');

        const version = this.config.get('version');
        this.app.use((req, res, next) => {
            req.version = version;
            res.set('Server', `NEWAPP ${version}`);

            req.reqid =
                'NEWAPP' +
                Math.random()
                    .toString(36)
                    .substr(2, 9);
            res.set('X-Request-Id', req.reqid);

            // req.store = store;
            //   req.daoFac = new DaoFac(store);

            next();
        });

        this.app.use(
            logger(
                ':remote-addr - - [:date[clf]] ":method :myurl HTTP/:http-version" :status :res[content-length] :response-time ":reqid"'
            )
        );

        this.app.get(['/healthcheck', '/api/healthcheck'], (req, res) => {
            return res.status(200).json({ status: 'ok', version: req.version, NODE_ENV: process.env.NODE_ENV });
        });

        this.app.use('/', homeRouter);

        // throw 404 if no data
        this.app.use((req, res, next) => {
            res.status(404).send();
            next();
        });
    }
};
