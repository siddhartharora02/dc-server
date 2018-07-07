const mongoose = require('mongoose');
const {isEmail} = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },
    phone: String,
    pan: String,
    company: String
},{
   timestamps: true
});

// unique validator on our user schema
UserSchema.plugin(uniqueValidator,  { message: '{PATH} {VALUE} already exists.' });

let User = mongoose.model('User', UserSchema);
module.exports = User;
