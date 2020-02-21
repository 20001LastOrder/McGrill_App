const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = require('./restaurant').schema
const User = require('./user')

const RestaurantOwner = User.discriminator('RestaurantOwner', new Schema({
    restaurants: [
        {
            type : Schema.Types.ObjectId, 
            ref: "Restaurant"
        }
    ],
}));

module.exports = RestaurantOwner;