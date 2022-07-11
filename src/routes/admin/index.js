const express = require('express');
const router = express.Router();
const {checkToken} = require('../../authentication/checkToken')

/**
 * /clinic
 * @url http://localhost:5001/clinic
 *
 */

router.use('/main', require('./endPoint/main.route.js'));
router.use('/auth', require('./endPoint/auth.route.js'));
router.use('/account', require('./endPoint/account.route.js'));
router.use('/appointment', require('./endPoint/appointment.route.js'));
router.use('/doctors', require('./endPoint/doctors.route.js'));
router.use('/staffs', require('./endPoint/staff.route.js'));
router.use('/pateints', require('./endPoint/pateint.route.js'));
router.use('/profile', checkToken, require('./endPoint/profile.route.js'));

module.exports = router