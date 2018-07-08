const User = require('../models/user.model');
const multerUpload = require('../../config/upload');

// create and Save a post
exports.create = (req,res) => {
    // Check if all fields are filled
    if(req.body.name && req.body.email && req.body.pan){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            pan: req.body.pan,
            company: req.body.company,
        });

        user.save().then(data => {
            res.status(201).send(data);
        }).catch(err => {
            console.log(err.errors.email.message);
            if(err.errors.email){
                return res.status(500).send({
                    message: err.errors.email.message
                });
            }
        })
    } else if(!req.body.email || !req.body.name){
        return res.status(400).send({
            message: "Form cannot be left blank!"
        })
    }
};

// create and Save a post
exports.upload = (req,res)=>{
    multerUpload.single(req.params.id)(req, res, function (err) {
        console.log(req.body);
        if (err) {
            console.log("We fucked up!")
            return
        }
        console.log("Everything is fine");
        if(req.params.id == 'photoUpload' && req.file){
            let photoUrl = req.file.filename;
            User.update(
                {_id: req.body.user_id},
                { $set: {photoUpload : photoUrl }},
                function (error, success) {
                    if (error) {
                        console.log("ERROR -" + error);
                    } else {
                        console.log("S -" + success);
                    }
                }

            );
        }else if(req.params.id == 'panUpload'  && req.file){
            let panUrl = req.file.filename
            User.update(
                {_id: req.body.user_id},
                { $set: {panUpload : panUrl }},
                function (error, success) {
                    if (error) {
                        console.log("ERROR -" + error);
                    } else {
                        console.log("S -" + success);
                    }
                }
            );
        } else if(req.params.id == 'aadharUpload'  && req.file){
            let aadharUrl = req.file.filename
            User.update(
                {_id: req.body.user_id},
                { $set: {aadharUpload : aadharUrl }},
                function (error, success) {
                    if (error) {
                        console.log("ERROR -" + error);
                    } else {
                        console.log("S -" + success);
                    }
                }
            );
        } else if(req.params.id == 'passportUpload'  && req.file){
            let passportUrl = req.file.filename
            console.log(passportUrl);
            User.update(
                {_id: req.body.user_id},
                { $set: {passportUpload : passportUrl}},
                function (error, success) {
                    if (error) {
                        console.log("ERROR -" + error);
                    } else {
                        console.log("S -" + success);
                    }
                }
            );
        }
    })
};

exports.fetchUploads = (req, res)=>{
    console.log(req.params.id);
    User.find({_id:req.params.id}).then(data=>{
        console.log(data[0]);
        res.send({
            photo: data[0].photoUpload,
            pan: data[0].panUpload,
            aadhar: data[0].aadharUpload,
            passport: data[0].passportUpload,
        });
    });
}

exports.createBankAccount = (req, res)=> {
    if (req.body.accName && req.body.accBank && req.body.accIfsc && req.body.accNumber && req.body.user_id) {
        const account = {
            accName: req.body.accName,
            accBank: req.body.accBank,
            accIfsc: req.body.accIfsc,
            accNumber: req.body.accNumber,
        };
        User.update(
            {_id: req.body.user_id},
            {$push: {accounts: account}}
        ).then( data => {
            console.log(data);
            res.send(data);
        }
        ).catch(error => {
            console.log("ERROR -" + error);
        });

    }
}
exports.findBankAccounts = (req, res) => {
    console.log("Bank Accounts - "+req.params.id);
    User.find({_id:req.params.id}).then(data=>{
        console.log(data[0]);
        res.send({
            account: data[0].accounts,
            photo: data[0].photoUpload
        });
    });
}

exports.findData = (req, res) => {
    User.find({_id:req.params.id}).then(data=>{
        let counter = 0;
        if(data[0].accounts.length > 0){
            counter++;
        }
        if(data[0].email && data[0].email != "" && data[0].email !=undefined && data[0].email != null  ){
            counter++;
        }
        if(data[0].photoUpload && data[0].photoUpload != "" && data[0].photoUpload !=undefined && data[0].photoUpload != null  ){
            counter++;
        }
        if(data[0].panUpload && data[0].panUpload != "" && data[0].panUpload !=undefined && data[0].panUpload != null  ){
            counter++;
        }
        if(data[0].aadharUpload && data[0].aadharUpload != "" && data[0].aadharUpload !=undefined && data[0].aadharUpload != null  ){
            counter++;
        }
        if(data[0].passportUpload && data[0].passportUpload != "" && data[0].passportUpload !=undefined && data[0].passportUpload != null  ){
            counter++;
        }
        counter = Math.round(counter/6 *100) +'%';
        res.send({
            counter : counter
        });
    });
}