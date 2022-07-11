const express = require('express');
const router = express.Router();
const {checkToken} = require('../../authentication/checkToken')

/**
 * /clinic
 * @url http://localhost:5001/clinic
 *
 */

router.use('/main', require('./endPoint/main.route'));
router.use('/auth', require('./endPoint/auth.route'));
router.use('/account', require('./endPoint/account.route'));
router.use('/appointment', require('./endPoint/appointment.route'));
router.use('/doctors', require('./endPoint/doctors.route'));
router.use('/staffs', require('./endPoint/staff.route'));
router.use('/pateints', require('./endPoint/pateint.route'));
router.use('/profile', checkToken, require('./endPoint/profile.route'));

module.exports = router