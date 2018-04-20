const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: String,
    message: String,
    phone: Number,
    email: String
},{
   timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);