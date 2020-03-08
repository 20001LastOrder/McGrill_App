const mongoose = require('mongoose');

require('mongoose-type-email');
const Schema = mongoose.Schema;
const User = require('./user')

const Admin = User.discriminator('Admin', new Schema({
    employeeid: {
        type: String,
        trim: true,
        lowercase: true, 
        required: true
    }
}));

module.exports = Admin;