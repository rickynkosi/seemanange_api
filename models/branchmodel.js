const Joi = require('joi');
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchid: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 20 
    },
    branchname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    }
});

const Branch = new mongoose.model('Branch', branchSchema);

//validation
function validateBranch(branch) {
    const schema = {
        branchid: Joi.number().min(1).required(),
        branchname: Joi.string().min(2).required()
    };

    return Joi.validate(branch, schema);
}

exports.Branch = Branch;
exports.validate = validateBranch;