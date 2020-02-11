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
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;