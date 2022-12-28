const mongoose = require('mongoose');
const lodash = require('lodash');
const { Member, validate } = require('../models/membermodel');
const admin = require('../middleware/admin');

exports.getMember = async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).send('The member with the given ID was not found.');
  
    res.send(member);
};

exports.getMembers = async (req, res, next) => {
    const member = await Member.find().sort('lastname');
    res.send(member);
};

exports.addMember = async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let member = await Member.findOne({ idnumber: req.body.idnumber });
    if (member) return res.status(400).send('Member already registered.');

    member = new Member(lodash.pick(req.body, 
        ['title',
        'firstname',
        'lastname',
        'idnumber',
        'birthdate',
        'passportnumber',
        'policy',
        'easypay',
        'premium',
        'postaladdress',
        'physicaladdress',
        'phonenumber',
        'email'
    ]));

    member = await member.save();
    res.send(member);
};

exports.updateMember = async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const members = await Member.findById(req.body.genreId);
    if (!members) return res.status(400).send('Invalid member.');
  
    const member = await Member.findByIdAndUpdate(req.params.id,
      { 
          title: req.body.title,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          idnumber: req.body.idnumber,
          policy: req.body.policy,
          physicaladdress: req.body.physicaladdress,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
        }, { new: true });
  
    if (!member) return res.status(404).send('The member with the given ID was not found.');
    
    res.send(member);
};

exports.deleteMember = async (req, res, next) => {
    const member = await Member.findByIdAndRemove(req.params.id);

    if (!member) return res.status(404).send('The member with the given ID was not found.');
  
    res.send(member);
};