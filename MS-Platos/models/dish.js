const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    state: {type: String },
    name : {type: String},
    price: {type: Number }
});

module.exports = mongoose.model('Dish', dishSchema);


