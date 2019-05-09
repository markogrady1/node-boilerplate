const _ = require('lodash');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// all boards, optionally filtered
router.get('/', async (req, res) => {

    res.render('home', {
        data: 'Hello Universe'
    });
});

module.exports = router;

