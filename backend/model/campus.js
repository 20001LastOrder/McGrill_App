const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campusSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    course: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    dateDue: {
        type: Date, 
        required: false 
    },
    status: {
        type: String, 
        required: true
    }
}, {
    timestamps: true,
});

const Campus = mongoose.model('Campus', campusSchema);

module.exports = Campus;