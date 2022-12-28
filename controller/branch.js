const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const {Branch, validate} = require('../models/branchmodel');

exports.getBranch = async (req, res, next) => {
        const branch = await Branch.findById(req.params.id).select("-__v");
      
        if (!branch)
          return res.status(404).send("The branch with the given ID was not found.");
      
        res.send(branch);
};

exports.getBranches = async (req, res, next) => {
    const branch = await Branch.find().sort('branchname')
        .select('-__v')
        .sort('branchname');
    res.send(branch);
};

exports.addBranch = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let branch = await Branch.findOne({ branchname: req.body.branchname });
    branch = new Branch(lodash.pick(req.body, ['branchid','branchname']));
    await branch.save(); 
    res.send(branch);
};

exports.updateBranch = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const branch = await Branch.findByIdAndUpdate(req.params.id, { 
        // districtcode: req.body.districtcode,
        branchid: req.body.branchid,
        branchname: req.body.branchname,
    },
    {
        new: true
    });

    if (!branch) return res.status(404).send('The given branch with the ID was not found');

    res.send(branch);
};

exports.deletebranch = async (req, res, next) => {
    const branch = await Branch.findByIdAndRemove(req.params.id);
     
    if (!branch) return res.status(404).send('The branch with the given ID was not found');

    res.send(branch);
};