const router = require('express').Router();

router.use('/', require('./home'));
router.use('/healthcheck', require('./healthcheck'));

module.exports = router;
