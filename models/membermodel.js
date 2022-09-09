const Joi = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    idnumber: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 13,
        unique: true
    },
    policy: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    easypay: {
        type: Number,
        minlength: 2,
        maxlength: 20,
        unique: true
    },
    premium: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    physicaladdress: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phonenumber: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 13,
        unique: true
    },
    email: {
        type: String,
        minlength: 2,
        maxlength: 255
    },
    extmembers: {
        type: String,
        minlength: 2,
        maxlength: 255
    },
    status: {
        type: Boolean,
        dafault: false,
    },
    dateregistered: {
        type: Date,
        default: Date.now
    }
});

const Member = new mongoose.model('Member', memberSchema);

//validation
function validateMember(member) {
    const schema = {
        title: Joi.string().min(2).required(),
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(5).required(),
        idnumber: Joi.number().min(2).required(),
        policy: Joi.string().min(2).required(),
        easypay: Joi.number().min(2),
        premium: Joi.number().min(2).required(),
        physicaladdress: Joi.string().min(2).required(),
        phonenumber: Joi.number().min(2).required(),
        email: Joi.string().min(2).email().required(),
        extmembers: Joi.string().min(2),
        status: Joi.string().min(2),
        dateregistered: Joi.date().min(2)
    };

    return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;