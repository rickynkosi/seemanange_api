const Joi = require('joi');
const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policynumber: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 20 
    },
    policyname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    cover: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255 
    },
    premium: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    benefits: {
        type: String,
        minlength: 2,
        maxlength: 255 
    },
    extras: {
        type: String,
        minlength: 2,
        maxlength: 255 
    },
});

const Policy = new mongoose.model('Policy', policySchema);

//validation
function validatePolicy(policy) {
    const schema = {
        policynumber: Joi.number().min(1).required(),
        policyname: Joi.string().min(2).required(),
        cover: Joi.string().min(2).required(),
        premium: Joi.string().min(2).required(),
        benefits: Joi.string().min(2),
        extras: Joi.string().min(2),
    };

    return Joi.validate(policy, schema);
}

exports.Policy = Policy;
exports.validate = validatePolicy;