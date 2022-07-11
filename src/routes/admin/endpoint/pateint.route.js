const express = require('express');
const router = express.Router();
const PateintController = require('../../../controllers/PateintController') 

/**
 * /clinic
 * @url http://localhost:5001/clinic/pateints
 *
 */

router.get('/', PateintController.getPateints)
router.post('/add', PateintController.addPateint)
router.get('/single-details', PateintController.singlePateint)
router.post('/update', PateintController.updatePateints)
router.post('/delete', PateintController.deletePatients)

module.exports = router