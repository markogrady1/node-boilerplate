const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home', {
    data: {
      greeting: 'Hello Universe',
      time: new Date().toJSON(),
    },
  });
});

module.exports = router;
