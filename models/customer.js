const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Model danych, potrzebne żeby można było wysyłać requesty

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
        required: true
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    number: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);

// biblioteka do walidacji ciała requestu, można się obejść bez niej więc możesz tego nie używać

function validate(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        number:Joi.string().min(5).max(50).required()
    });

    return schema.validate(customer);
}

exports.validate = validate;
exports.Customer = Customer;
exports.customerSchema = customerSchema;