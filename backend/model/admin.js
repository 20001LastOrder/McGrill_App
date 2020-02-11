const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
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
        Street: { type:String, required: true },
        City:  { type:String, required: true },
        Zip: { type: String, required: true }
    },
    isServer: {
        type: Boolean, 
        required: false
    }
});

AdminSchema.pre('save', function(next) {
    var admin = this;
    if (!admin.isModified('password'))
        return next({description: 'password could not be reset'});
    bcrypt.hash(admin.password, 10, function(err, hash) {
        if (err) return next(err);
        admin.password = hash;
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