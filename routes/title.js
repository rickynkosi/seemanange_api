// const {Member, validate} = require('.'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const { Title, validate } = require('../models/titlemodel');
const admin = require('../middleware/admin');
const agent = require('../middleware/agent');

router.get('/', async (req, res) => {
    const title = await Title.find().sort('title')
        .select('-__v')
        .sort('name');
    res.send(title);
});

router.get('/:id', async (req, res) => {
  const title = await Title.findById(req.params.id);

  if (!title) return res.status(404).send('The policy with the given ID was not found.');

  res.send(policy);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let title = await Title.findOne({ name: req.body.name });
  if (title) return res.status(400).send('Title already registered.');

    // let policy = new Policy({
    //     title: req.body.title,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     idnumber: req.body.idnumber,
    //     policy: req.body.policy,
    //     physicaladdress: req.body.physicaladdress,
    //     phonenumber: req.body.phonenumber,
    //     email: req.body.email,
    // });

    title = new Title(lodash.pick(req.body, ['name']));

    title = await title.save();
    res.send(title);
});

router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  const policy = await Policy.findByIdAndRemove(req.params.id);

  if (!policy) return res.status(404).send('The policy with the given ID was not found.');

  res.send(policy);
});

module.exports = router; 