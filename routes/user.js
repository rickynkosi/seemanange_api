const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('user')
        .select('-__v')
        .sort('firstname');
    res.send(user);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username, email: req.body.email });
    if (user) return res.status(400).send('Username is taken please chose another one.');

    // user = new User({
    //     fullname: req.body.fullname,
    //     email: req.body.email,
    //     phonenumber: req.body.phonenumber,
    //     username: req.body.username,
    //     password: req.body.password,
    //     repeatpassword: req.body.repeatpassword
    //     // role: req.body.role

    // });
    user = new User(lodash.pick(req.body, ['fullname','email','phonenumber','username','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save(); 

    const token = user.generateAuthToken();
    res
        .header('x-auth-token',token)
        .send(lodash.pick(user, ['_id','fullname','email','phonenumber','username','password']));
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const users = await User.findOne({username: req.body.username});
    if (!users) return res.status(400).send('Invalid user.');
  
    const user = await User.findByIdAndUpdate(req.params.id,
      { 
          fullname: req.body.title,
          email: req.body.firstname,
          phonenumber: req.body.lastname,
          username: req.body.username,
          password: req.body.physicaladdress
        }, { new: true });
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send(user);
  });


router.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
     
    if (!user) return res.status(404).send('The user with the given ID was not found');

    res.send(user);
});

module.exports = router;