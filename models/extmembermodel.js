const Joi = require('joi');
const mongoose = require('mongoose');

const extmemberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20 
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    mmidnumber: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    idnumber: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    membertype: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    memberrelation: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    }
});

const ExtMember = new mongoose.model('ExtMember', extmemberSchema);

//validation
function validateExtMember(extmember) {
    const schema = {
        firstname: Joi.string().min(1).required(),
        surname: Joi.string().min(2).required(),
        mmidnumber: Joi.number().min(2).required(),
        idnumber: Joi.number().min(2).required(),
        membertype: Joi.string().min(2).required(),
        memberrelation: Joi.string().min(2).required()
    };

    return Joi.validate(extmember, schema);
}

exports.ExtMember = ExtMember;
exports.validate = validateExtMember;