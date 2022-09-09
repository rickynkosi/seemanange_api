const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50 
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('User', userSchema);

//validation
function validateUser(user) {
    const schema = {
        fullname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        phonenumber: Joi.string().min(5).max(255).required(),
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()

    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;