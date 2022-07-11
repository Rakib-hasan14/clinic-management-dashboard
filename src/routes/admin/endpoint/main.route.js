const express = require('express');
const router = express.Router();
const MainController = require('../../../controllers/MainController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/main
 *
 */

router.get('/', MainController.getMainAllInfo)

module.exports = router