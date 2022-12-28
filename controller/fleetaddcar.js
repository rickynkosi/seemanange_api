const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const {Car, validate} = require('../models/fleetaddcarmodel');

exports.getFleets = async (req, res, next) => {
    const car = await Car.find().sort('name');
    res.send(car);
};

exports.getFleet = async (req, res, next) => {
     // throw new Error('Could not get the car.');
     const car = await Car.findById(req.params.id);
     if (!car) return res.status(400).send('The Car with given ID was not found');
     res.send(car);
};

exports.addFleet = async (req, res, next) => {
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
};

exports.updateFleet = async (req, res, next) => {
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
};

exports.deleteFleet = async (req, res, next) => {
    const car = await Car.findByIdAndRemove(req.params.id);
     
    if (!car) return res.status(404).send('The car with the given ID was not found');

    res.send(car);
};