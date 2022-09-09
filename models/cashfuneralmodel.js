const Joi = require('joi');
const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    idnumber: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phonenumber: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    amount: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    services: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Cash = new mongoose.model('Cash', cashSchema);

//validation
function validateCash(cash) {
    const schema = {
        fullname: Joi.string().min(2).required(),
        idnumber: Joi.string().min(2).required(),
        phonenumber: Joi.number().min(2).required(),
        amount: Joi.number().min(2).required(),
        services: Joi.number().min(2).required()
        // date: Joi.Date().min(2).required()
    }
    return Joi.validate(cash);
}

exports.Cash = Cash;
exports.validate = validateCash;