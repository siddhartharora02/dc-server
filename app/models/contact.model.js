const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    message: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
},{
   timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);