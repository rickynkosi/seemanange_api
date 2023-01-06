const mongoose = require('mongoose');
// const admin = require('../middleware/admin');
// const auth = require('../middleware/auth');
const {Car, validate} = require('../models/fleetaddcarmodel');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { getFleet, getFleets, addFleet, updateFleet, deleteFleet } = require('../models/fleetaddcarmodel');


//get all fleet 
router.get('/', async (req, res) => {
    
});


// get a single fleet
router.get('/:id', async(req, res) => {
   
});

// add a fleet
router.post('/', async(req, res) => {

    
});

//update a fleet
router.put('/:id',admin, async(req, res) => {
    
});

// delete fleet
router.delete('/:id',admin, async(req, res) => {
    
});

router.get('/', getFleets);

router.get('/:id', getFleet);

router.get('/', addFleet);

router.updateFleet('/:id', updateFleet);

router.delete('/:id', deleteFleet);

module.exports = router;