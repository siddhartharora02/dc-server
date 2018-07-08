const mongoose = require('mongoose');

const UploadSchema = mongoose.Schema({
    photoUrl: String,
    panUrl: String,
    aadharUrl: String,
    passportUrl: String,
    user_id: String
},{
   timestamps: true
});

let Upload = mongoose.model('Upload', UploadSchema);
module.exports = Upload;
