const mongoose = require('mongoose');
const {isEmail} = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },
    phone: String,
    pan: {
        type: String,
        required: true,
    },
    company: String,
    photoUpload: String,
    panUpload: String,
    aadharUpload: String,
    passportUpload: String,
    accounts:[{
        accNumber: Number,
        accName: String,
        accIfsc: String,
        accBank: String
    }],
},{
   timestamps: true
});

// unique validator on our user schema
UserSchema.plugin(uniqueValidator,  { message: '{PATH} {VALUE} already exists.' });

let User = mongoose.model('User', UserSchema);
module.exports = User;
