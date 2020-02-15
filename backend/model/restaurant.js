const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const MenuItem = require('./menuitem').schema

const RestaurantSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        index: {
            unique: true,
        }
    },
    password: {
        type: String, 
        required: true
    }, 
    isServer: {
        type: Boolean, 
        required: false
    },
    created_at: {
        type:Date,default:new Date()
    },
    menuitems: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "MenuItem"
        }
    ]
});

RestaurantSchema.pre('save', function(next) {
    var restaurant = this;
    if (!restaurant.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(restaurant.password, 10, function(err, hash) {
        if (err) return next(err);
        restaurant.password = hash;
        next();
    });
});

RestaurantSchema.methods.comparePassword = (function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;