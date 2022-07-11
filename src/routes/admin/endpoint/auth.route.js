const express = require('express');
const router = express.Router();
const AuthenticationController = require('../../../controllers/AuthenticationController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/auth
 *
 */

router.post('/create', AuthenticationController.createUsers)
router.post('/sign-in', AuthenticationController.signIn)

module.exports = router