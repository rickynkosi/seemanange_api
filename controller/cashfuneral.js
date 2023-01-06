const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const {Cash, validate} = require('../models/cashfuneralmodel');

exports.getCashfuneral = async (req, res, next) => {
    const cash = await Cash.find().sort('fullname');
    res.send(cash);
};

exports.getCashfunerals = async (req, res, next) => {
    const cash = await Cash.find().sort('fullname')
        .select('-__v')
        .sort('fullname');
    res.send(cash);
};

exports.addCashfuneral = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let cash = await Cash.findOne({ idnumber: req.body.idnumber });
    if (cash) return res.status(400).send('CashFuneral already registered.');

    cash = new Cash(lodash.pick(req.body, ['fullname','idnumber','phonenumber','amount','services']));
    await cash.save(); 
    res.send(cash);
};

exports.updateCashfuneral = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const cash = await Cash.findByIdAndUpdate(req.params.id, { 
        fullname: req.body.fullname,
        idnumber: req.body.idnumber,
        phonenumber: req.body.phonenumber,
        amount: req.body.amount,
        services: req.body.services
    },
    {
        new: true
    });

    if (!cash) return res.status(404).send('The given cashfuneral with the ID was not found');

    res.send(cash);
};

exports.deleteCashfuneral = async (req, res, next) => {
    const cash = await Cash.findByIdAndRemove(req.params.id);
     
    if (!cash) return res.status(404).send('The cash funeral with the given ID was not found');

    res.send(cash);
};