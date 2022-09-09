const Joi = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    regnumber: {
        type: String,
        required: true,
        minlength: 19,
        maxlength: 20 
    },
    driver: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    destination: {
        type: Number,
        required: true,
        minlength: 15,
        maxlength: 20
    },
    mileagestart: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    mileageend: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    }
});

const Member = new mongoose.model('Policy', memberSchema);

//validation
function validatePolicy(policy) {
    const schema = {
        car: Joi.string().min(3).required(),
        driver: Joi.string().min(3).required(),
        destination: Joi.string().min(5).required(),
        mileage: Joi.number().min(5).required()
    };

    return Joi.validate(policy, schema);
}

exports.Member = Member;
exports.validate = validateMember;