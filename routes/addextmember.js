const {Movie, validate} = require('../models/newmember'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('../');
const { Member } = require('../../models/admin/fleetnew');

router.get('/', async (req, res) => {
  const extmember = await Extmember.find().sort('name');
  res.send(extmember);
});

router.get('/:id', async (req, res) => {
  const extmember = await Extmember.findById(req.params.id);

  if (!extmember) return res.status(404).send('The extmember with the given ID was not found.');

  res.send(extmember);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const members = await Member.findById(req.body.memberId);
  if (!members) return res.status(400).send('Invalid genre.');

    let extmember = new Member({
        fullname: req.body.fullname,
        idnumber: req.body.idnumber
    });

    extmember = await extmember.save();
    res.send(extmember);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const members = await Member.findById(req.body.genreId);
  if (!members) return res.status(400).send('Invalid member.');

  const extmember = await Movie.findByIdAndUpdate(req.params.id,
    { 
        fullname: req.body.fullname,
        idnumber: req.body.idnumber
      }, { new: true });

  if (!extmember) return res.status(404).send('The extmember with the given ID was not found.');
  
  res.send(extmember);
});

router.delete('/:id', async (req, res) => {
  const extmember = await Extmember.findByIdAndRemove(req.params.id);

  if (!extmember) return res.status(404).send('The extmember with the given ID was not found.');

  res.send(extmember);
});

module.exports = router; 