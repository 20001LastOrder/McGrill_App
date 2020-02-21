const mongoose = require('mongoose');

require('mongoose-type-email');
const Schema = mongoose.Schema;
const User = require('./user')

const Admin = User.discriminator('Admin', new Schema({
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
}));

module.exports = Admin;