const express = require('express');
const router = express.Router();
const AppointmentController = require('../../../controllers/AppointmentController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/appointment
 *
 */

router.get('/', AppointmentController.getAppointments)
router.get('/category', AppointmentController.getCategory)
router.get('/done', AppointmentController.makeDone)
router.post('/add', AppointmentController.addAppointment)

module.exports = router