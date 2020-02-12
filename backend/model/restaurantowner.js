const mongoose = require('mongoose');

require('mongoose-type-email');
const extendSchema = require('mongoose-extend-schema');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Restaurant = require('./restaurant').schema
const UserSchema = require('./user').schema

const RestaurantOwnerSchema = extendSchema(UserSchema, {
    restaurant: {
        type: [Restaurant],
        required: false
    },
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

RestaurantOwnerSchema.pre('save', function(next) {
    var owner = this;
    if (!owner.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(owner.password, 10, function(err, hash) {
        if (err) return next(err);
        owner.password = hash;
        next();
    });
});

RestaurantOwnerSchema.methods.checkIsOwner = (function(next) {
    if(!this.isOwner) return next({description: 'The user is not registered as a restaurant owner'});
    next();
});

RestaurantOwnerSchema.methods.comparePassword = (function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
});

const RestaurantOwner = mongoose.model('RestaurantOwner', RestaurantOwnerSchema);
module.exports = RestaurantOwner;