const express = require('express');
const router = express.Router();
const { getDriveradd, getDriveradds, addDriveradd, updateDriveradd, deleteDriveradd } = require('../controller/fleetdriveradd');

//get all drivers 
router.get('/', getDriveradds);


// get a single fleet
router.get('/:id', getDriveradd);

// add driver
router.post('/', addDriveradd);

//update driver
router.put('/:id', updateDriveradd);

// delete driver
router.delete('/:id', deleteDriveradd);

module.exports = router;