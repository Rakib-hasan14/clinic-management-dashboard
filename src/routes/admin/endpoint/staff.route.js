const express = require('express');
const router = express.Router();
const StaffController = require('../../../controllers/StaffController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/staffs
 *
 */

router.get('/', StaffController.getStaffs)
router.get('/single-details', StaffController.singleStaffs)
router.post('/update', StaffController.updateStaffs)
router.post('/delete', StaffController.deleteStaffs)

module.exports = router