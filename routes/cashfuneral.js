const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const {Cash, validate} = require('../models/cashfuneralmodel');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const cash = await Cash.find().sort('fullname');
    res.send(cash);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let cash = await Cash.findOne({ idnumber: req.body.idnumber });
    if (cash) return res.status(400).send('CashFuneral already registered.');

    cash = new Cash(lodash.pick(req.body, ['fullname','idnumber','phonenumber','amount','services']));
    await cash.save(); 
    res.send(cash);
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const cash = await Car.findByIdAndUpdate(req.params.id, { 
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
});

router.delete('/:id',admin, async(req, res) => {
    const cash = await Cash.findByIdAndRemove(req.params.id);
     
    if (!cash) return res.status(404).send('The member with the given ID was not found');

    res.send(cash);
});

module.exports = router;