const mongoose = require('mongoose');

require('mongoose-type-email');
const extendSchema = require('mongoose-extend-schema');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Restaurant = require('./restaurant').schema
const UserSchema = require('./user').schema

const RestaurantOwnerSchema = extendSchema(UserSchema, {
    restaurant: [Restaurant],
    restaurant_address: {
        street: { type:String, lowercase: true, required: true },
        city:  { type:String, lowercase: true, required: true },
        zip: { type:String, uppercase: true, required: true }
    },
    isOwner: {
        type: Boolean,
        required: true,
        default: true
    }
})

const RestaurantOwnerSchema = mongoose.model('RestaurantOwner', RestaurantOwnerSchema);
module.exports = RestaurantOwner;