const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    state: {type: String },
    table: {type: Number},
    dishId: {type: Number}
});

module.exports = mongoose.model('Order', logSchema);


