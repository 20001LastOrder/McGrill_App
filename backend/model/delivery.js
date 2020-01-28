const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    dateExpect: {
        type: Date, 
        required: true
    }, 
    status: {
        type: String, 
        required: true
    }
}, {
    timestamps: true,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;