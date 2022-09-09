const mongoose = require('mongoose');
const lodash = require('lodash');
const { Policy, validate } = require('../models/policymodel');
const admin = require('../middleware/admin');

exports.getPolicies = async (req, res, next) => {
    const policy = await Policy.find().sort('lastname');
    res.send(policy);
};
  
exports.getPolicy = async (req, res, next) => {
    const policy = await Policy.findById(req.params.id);
  
    if (!policy) return res.status(404).send('The policy with the given ID was not found.');
  
    res.send(policy);
};
  
exports.addPolicy = async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let policy = await Policy.findOne({ policynumber: req.body.policynumber });
    if (policy) return res.status(400).send('Policy already registered.');
  
      policy = new Policy(lodash.pick(req.body, ['policynumber','policyname','cover', 'premium', 'benefits', 'extras']));
  
      policy = await policy.save();
      res.send(policy);
};
  
exports.updatePolicy = async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const policies = await Policy.findById(req.body.genreId);
    if (!policies) return res.status(400).send('Invalid policy.');
  
    const policy = await Policy.findByIdAndUpdate(req.params.id,
      { 
          title: req.body.title,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          idnumber: req.body.idnumber,
          physicaladdress: req.body.physicaladdress,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
        }, { new: true });
  
    if (!policy) return res.status(404).send('The policy with the given ID was not found.');
    
    res.send(policy);
};
  
exports.deletePolicy = async (req, res, next) => {
    const policy = await Policy.findByIdAndRemove(req.params.id);
  
    if (!policy) return res.status(404).send('The policy with the given ID was not found.');
  
    res.send(policy);
};