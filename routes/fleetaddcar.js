const mongoose = require('mongoose');
// const admin = require('../middleware/admin');
// const auth = require('../middleware/auth');
const {Car, validate} = require('../models/fleetaddcarmodel');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();


//get all fleet 
router.get('/', async (req, res) => {
    const car = await Car.find().sort('name');
    res.send(car);
});


// get a single fleet
router.get('/:id', async(req, res) => {
    // throw new Error('Could not get the car.');
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(400).send('The Car with given ID was not found');
    res.send(car);
});

// add a fleet
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addcars = await Car.findOne({ regnumber: req.body.regnumber });
    if (addcars) return res.status(400).send('Car already registered.');

    let addcar = new Car({
        regnumber: req.body.regnumber,
        carmodel: req.body.carmodel,
        mileage: req.body.mileage
    });

    addcar = await addcar.save();
    res.send(addcar);
});

//update a fleet
router.put('/:id',admin, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = await Car.findByIdAndUpdate(req.params.id, { 
        regnumber: req.body.regnumber, 
        carmodel: req.body.carmodel, 
        mileage: req.body.mileage 
    },
    {
        new: true
    });

    if (!car) return res.status(404).send('The given car with the ID was not found');

    res.send(car);
});

// delete fleet
router.delete('/:id',admin, async(req, res) => {
    const car = await Car.findByIdAndRemove(req.params.id);
     
    if (!car) return res.status(404).send('The car with the given ID was not found');

    res.send(car);
});

module.exports = router;