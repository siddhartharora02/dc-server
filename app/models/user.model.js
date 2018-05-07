const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    }
},{
   timestamps: true
});

// unique validator on our user schema
UserSchema.plugin(uniqueValidator,  { message: '{PATH} {VALUE} already exists.' });

// Hashing a password before saving it to the database
UserSchema.pre('save',function(next){
    let user = this;
    bcrypt.hash(user.password, 10, (err,hash)=>{
        if(err){
            return next(err);
        }
        user.password = hash;

        next();
    })
});

let User = mongoose.model('User', UserSchema);
module.exports = User;
