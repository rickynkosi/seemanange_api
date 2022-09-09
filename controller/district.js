const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const {District, validate} = require('../models/districtmodel');

exports.getDistrict = async (req, res, next) => {
        const district = await District.findById(req.params.id).select("-__v");
      
        if (!district)
          return res.status(404).send("The district with the given ID was not found.");
      
        res.send(district);
};

exports.getDistricts = async (req, res, next) => {
    const district = await District.find().sort('district')
        .select('-__v')
        .sort('districtname');
    res.send(district);
};

exports.addDistrict = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let district = await District.findOne({ districtname: req.body.districtname });
    if (district) return res.status(400).send('District already registered.');

    district = new District(lodash.pick(req.body, ['districtcode','districtname']));
    await district.save(); 
    res.send(district);
};

exports.updateDistrict = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const district = await District.findByIdAndUpdate(req.params.id, { 
        // districtcode: req.body.districtcode,
        districtname: req.body.districtname,
    },
    {
        new: true
    });

    if (!district) return res.status(404).send('The given district with the ID was not found');

    res.send(district);
};

exports.deleteDistrict = async (req, res, next) => {
    const district = await District.findByIdAndRemove(req.params.id);
     
    if (!district) return res.status(404).send('The district with the given ID was not found');

    res.send(district);
};