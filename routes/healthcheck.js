const config = require('config');
const log = require('pino')();
const router = require('express').Router();

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
