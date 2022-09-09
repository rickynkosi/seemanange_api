const mongoose = require('mongoose');
// const admin = require('../middleware/admin');
// const auth = require('../middleware/auth');
const {Car, validate} = require('../../models/admin/fleet');
const express = require('express');
const router = express.Router();


//get all drivers 
router.get('/', async (req, res) => {
    const driver = await Driver.find().sort('name');
    res.send(driver);
});


// get a single fleet
router.get('/:id', async(req, res) => {
    // throw new Error('Could not get the car.');
    const driver = await Car.findById(req.params.id);
    if (!driver) return res.status(400).send('The driver with given ID was not found');
    res.send(driver);
});

// add driver
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let addriver = new Car({
        fullname: req.body.fullname,
        phone: req.body.phone,
        status: req.body.status,
        deactivate: req.body.deactivate
    });

    addriver = await addriver.save();
    res.send(addriver);
});

//update driver
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const driver = await Car.findByIdAndUpdate(req.params.id, { 
        regnumber: req.body.regnumber, 
        carmodel: req.body.carmodel, 
        mileage: req.body.mileage 
    },
    {
        new: true
    });

    if (!driver) return res.status(404).send('The given driver with the ID was not found');

    res.send(driver);
});

// delete driver
router.delete('/:id', async(req, res) => {
    const driver = await Car.findByIdAndRemove(req.params.id);
     
    if (!driver) return res.status(404).send('The driver with the given ID was not found');

    res.send(driver);
});

module.exports = router;