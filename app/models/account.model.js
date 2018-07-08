const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    user_id: String,
    accNumber: Number,
    accName: String,
    accIfsc: String,
    accBank: String
},{
    timestamps: true
});

let Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
