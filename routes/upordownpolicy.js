const {Movie, validate} = require('../models/newmember'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('../');
const { Member } = require('../../models/admin/fleetnew');

router.get('/', async (req, res) => {
  const member = await Member.find().sort('name');
  res.send(member);
});

router.get('/:id', async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) return res.status(404).send('The member with the given ID was not found.');

  res.send(member);
});


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const members = await Member.findById(req.body.memberId);
  if (!members) return res.status(400).send('Invalid member.');

  const member = await Movie.findByIdAndUpdate(req.params.id,
    { 
        policy: req.body.policy,
        premium: req.body.premium
      }, { new: true });

  if (!member) return res.status(404).send('The member with the given ID was not found.');
  
  res.send(member);
});

module.exports = router; 