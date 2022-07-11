const express = require('express');
const router = express.Router();
const AccountController = require('../../../controllers/AccountController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/account
 *
 */

router.get('/', AccountController.getTransactions)
router.get('/single-details', AccountController.singleTransactions)
router.post('/send', AccountController.sendMoney)
router.post('/delete', AccountController.deleteTransactions)

module.exports = router