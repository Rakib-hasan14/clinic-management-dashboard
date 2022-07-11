const express = require('express');
const router = express.Router();

/**
 * @url http://localhost:5001/
 */

router.get('/', async (req, res) => {
    res.send('Welcome to Clinic Backend');
});

router.use('/clinic', require('./admin'));

module.exports = router;