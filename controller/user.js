const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User, validate } = require('../models/usermodel');
const admin = require('../middleware/admin');

exports.getUsers = async (req, res, next) => {
    const user = await User.find().sort('name');
    res.send(user);
}

exports.addUsers = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username, email: req.body.email });
    if (user) return res.status(400).send('username is taken please chose another one.');

    user = new User(lodash.pick(req.body, ['fullname','email','phonenumber','username','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save(); 

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(lodash.pick(user, ['_id','fullname','email','phonenumber','username','password']));
}

exports.updateUser = admin, async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const users = await User.findOne({username: req.body.username});
    if (!users) return res.status(400).send('Invalid user.');
  
    const member = await Movie.findByIdAndUpdate(req.params.id,
      { 
          fullname: req.body.title,
          email: req.body.firstname,
          phonenumber: req.body.lastname,
          username: req.body.username,
          password: req.body.physicaladdress
        }, { new: true });
  
    if (!member) return res.status(404).send('The member with the given ID was not found.');
    
    res.send(member);
}
exports.updateUser = async (req, res, next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const users = await User.findOne({username: req.body.username});
    if (!users) return res.status(400).send('Invalid user.');
  
    const member = await Movie.findByIdAndUpdate(req.params.id,
      { 
          fullname: req.body.title,
          email: req.body.firstname,
          phonenumber: req.body.lastname,
          username: req.body.username,
          password: req.body.physicaladdress
        }, { new: true });
  
    if (!member) return res.status(404).send('The member with the given ID was not found.');
    
    res.send(member);
}

exports.deleteUser =  async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
     
    if (!user) return res.status(404).send('The user with the given ID was not found');

    res.send(user);
}

