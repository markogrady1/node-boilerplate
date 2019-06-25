'use strict';
const winston = require('winston');
const root = require('app-root-path');

const { combine, timestamp, label, json } = winston.format;

const formatOpts = combine(label({ label: 'app' }), timestamp(), json());

const log = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      level: process.env.ATS_TK_APP_LOG_LEVEL || 'info',
      format: formatOpts
    }),
    new winston.transports.File({
      filename:
        process.env.ACCESS_LOG_FILE || `${root}/logs/ats-textkernal-search.log`,
      level: process.env.ATS_TK_APP_LOG_LEVEL || 'info',
      format: formatOpts
    })
  ]
});

log.stream = {
  write: message => log.info(message)
};

module.exports = log;

/*

Application log

Usage:
    const log = require('RELATIVE-PATH/log');

    log.debug('message');
    log.info('message');
    log.warning('message');
    log.error('message');

*/

