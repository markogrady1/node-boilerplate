const config = require('config');
const router = require('express').Router();

const log = require('../config/logger');

router.get('/', async (req, res) => {
  let status = 500;

  try {
    status = 200;
    log.info(`healthcheck: ${status}`);
  } catch (error) {
    log.error(error);
  }

  res.status(status).send({
    status: 'OK',
    version: config.version,
    time: new Date().toISOString(),
  });
});

module.exports = router;
