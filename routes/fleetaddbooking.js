const express = require('express');
const router = express.Router();
const { getFleetbooking, getFleetbookings, addFleetbooking, updateFleetbooking, deleteFleetbooking } = require('../controller/fleetbooking');

router.get('/', getFleetbookings);

router.get('/:id', getFleetbooking);

router.post('/', addFleetbooking);

router.delete('/:id', deleteFleetbooking);

router.put('/:id', updateFleetbooking);

module.exports = router;