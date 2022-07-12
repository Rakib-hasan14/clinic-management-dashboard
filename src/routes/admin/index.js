const express = require('express');
const router = express.Router();
const {checkToken} = require('../../authentication/checkToken')

/**
 * /clinic
 * @url http://localhost:5001/clinic
 *
 */

router.use('/main', require('./endpoint/main.route'));
router.use('/auth', require('./endpoint/auth.route'));
router.use('/account', require('./endpoint/account.route'));
router.use('/appointment', require('./endpoint/appointment.route'));
router.use('/doctors', require('./endpoint/doctors.route'));
router.use('/staffs', require('./endpoint/staff.route'));
router.use('/pateints', require('./endpoint/pateint.route'));
router.use('/profile', checkToken, require('./endpoint/profile.route'));

module.exports = router