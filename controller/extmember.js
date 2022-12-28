const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const {ExtMember, validate} = require('../models/extmembermodel');

exports.getExtMember = async (req, res, next) => {
        const extmember = await ExtMember.findById(req.params.id).select("-__v");
      
        if (!extmember)
          return res.status(404).send("The extmember with the given ID was not found.");
      
        res.send(extmember);
};

exports.getExtMembers = async (req, res, next) => {
    const extmember = await ExtMember.find().sort('extmember')
        .select('-__v')
        .sort('firstname');
    res.send(extmember);
};

exports.addExtMember = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let extmember = await ExtMember.findOne({ firstname: req.body.firstname });
    if (extmember) return res.status(400).send('ExtMember already registered.');

    extmember = new ExtMember(lodash.pick(req.body, ['firstname','surname','mmidnumber','idnumber','membertype','memberrelation']));
    await extmember.save(); 
    res.send(extmember);
};

exports.updateExtMember = async (req, res, next) => {
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

exports.deleteExtMember = async (req, res, next) => {
    const extmember = await ExtMember.findByIdAndRemove(req.params.id);
     
    if (!extmember) return res.status(404).send('The extmember with the given ID was not found');

    res.send(extmember);
};