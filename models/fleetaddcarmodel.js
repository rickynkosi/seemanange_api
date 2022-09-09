const Joi = require('joi');
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    regnumber: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20 
    },
    carmodel: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    mileage: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 20
     }
});

const Car = new mongoose.model('Car', carSchema);

//validation
function validateCar(car) {
    const schema = {
        regnumber: Joi.string().min(2).required(),
        carmodel: Joi.string().min(2).required(),
        mileage: Joi.number().min(2).required()
    }
    return Joi.validate(car);
}

exports.Car = Car;
exports.validate = validateCar;