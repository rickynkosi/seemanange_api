const Joi = require('joi');
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    districtcode: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 20 
    },
    districtname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    }
});

const District = new mongoose.model('District', districtSchema);

//validation
function validateDistrict(district) {
    const schema = {
        districtcode: Joi.number().min(1).required(),
        districtname: Joi.string().min(2).required()
    };

    return Joi.validate(district, schema);
}

exports.District = District;
exports.validate = validateDistrict;