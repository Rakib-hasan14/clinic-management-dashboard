const express = require('express');
const router = express.Router();
const AuthenticationController = require('../../../controllers/AuthenticationController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/profile
 *
 */

router.get('/', AuthenticationController.getProfile)
router.post('/update', AuthenticationController.updateProfile)

module.exports = router