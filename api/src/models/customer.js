var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
    cpf: String,
    name: String,
    email: String,
    marital_status: String,
    address: {
        street: String,
        number: String,
        neighborhood: String,
        city: String
    },
    phone_numbers: [{number: String}]
});

module.exports = Mongoose.model('customers', schema);