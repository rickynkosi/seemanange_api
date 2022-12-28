const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');

exports.addDistrict = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let district = await District.findOne({ districtname: req.body.districtname });
    if (district) return res.status(400).send('District already registered.');

    district = new District(lodash.pick(req.body, ['districtcode','districtname']));
    await district.save(); 
    res.send(district);
};