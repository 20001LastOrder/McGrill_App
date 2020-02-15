const mongoose = require('mongoose');

require('mongoose-type-email');
const extendSchema = require('mongoose-extend-schema');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = require('./user').schema

const AdminSchema = extendSchema(UserSchema, {
    firstname: {
        type: String,
        trim: true,
        lowercase: true, 
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true, 
        required: true
    }
});

AdminSchema.pre('save', function(next) {
    var admin = this;
    let now = Date.now();
    if (!admin.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(admin.password, 10, function(err, hash) {
        if (err) return next(err);
        admin.password = hash;
        admin.created_at = now;
        next();
    });
});

AdminSchema.methods.comparePassword = (function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;