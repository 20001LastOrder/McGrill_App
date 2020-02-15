const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        minlength: 3,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        index: {
            unique: true,
        }
    },
    password: {
        type: String, 
        trim: true,
        minlength: 6,
        required: true,
    },
    address: {
        street: { type:String, lowercase: true, required: true },
        city:  { type:String, lowercase: true, required: true },
        zip: { type: String, lowercase: true, required: true }
    },
    created_at: {
        type:Date,
        default: new Date()
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    let now = Date.now();
    if (!user.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.created_at = now;
        next();
    });
});

UserSchema.methods.comparePassword = (function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;