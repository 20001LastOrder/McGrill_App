const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const MenuItem = require('./menuitem').schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        index: {
            unique: true,
        }
    },
    address: {
        street: { type:String, lowercase: true, required: true },
        city:  { type:String, lowercase: true, required: true },
        zip: { type:String, lowercase: true, required: true }
    },
    created_at: {
        type:Date,
        default: new Date()
    },
    menuitems: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "MenuItem"
        }
    ]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;