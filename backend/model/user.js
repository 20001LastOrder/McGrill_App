const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
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