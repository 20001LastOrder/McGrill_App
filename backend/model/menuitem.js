const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const MenuitemScheme = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        default: ""
    },
    price: {
        type: Number,
        required: false
    }, 
    sold_out: {
        type: Boolean, 
        default: false
    },
    stock: {
        type: Number, 
        default: 500
    }
})

const MenuItem = mongoose.model('MenuItem', MenuitemScheme);

module.exports = MenuItem;