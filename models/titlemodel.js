const Joi = require("joi");
const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Title = mongoose.model("Title", titleSchema);

function validateTitle(title) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(10)
      .required(),
  };

  return Joi.validate(title, schema);
}

exports.Title = Title;
exports.validate = validateTitle;
