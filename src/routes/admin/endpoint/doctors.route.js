const express = require('express');
const router = express.Router();
const DoctorsController = require('../../../controllers/DoctorsController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/doctors
 *
 */

router.get('/', DoctorsController.getDoctors)
router.get('/single-details', DoctorsController.singleDoctors)
router.post('/update', DoctorsController.updateDoctor)
router.post('/delete', DoctorsController.deleteDoctor)

module.exports = router