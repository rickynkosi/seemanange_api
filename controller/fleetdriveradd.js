const express = require('express');
const mongoose = require('mongoose');
const lodash = requre('lodash');
const mongoose = require('mongoose');
const {Car, validate} = require('../../models/driveradd');

exports.getDriveradds = async (req, res, next) => {
    const driver = await Driver.find().sort('name');
    res.send(driver);
};

exports.getDriveradd = async (req, res, next) => {
    // throw new Error('Could not get the car.');
    const driver = await Car.findById(req.params.id);
    if (!driver) return res.status(400).send('The driver with given ID was not found');
    res.send(driver);
};

exports.addDriveradd = async (req, res, next) => {
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
};

exports.updateDriveradd = async (req, res, next) => {
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
};

exports.deleteDriveradd = async (req, res, next) => {
    const driver = await Car.findByIdAndRemove(req.params.id);
     
    if (!driver) return res.status(404).send('The driver with the given ID was not found');

    res.send(driver);
};
