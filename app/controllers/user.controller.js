const User = require('../models/user.model');
const bcrypt = require('bcrypt');
// create and Save a post
exports.create = (req,res) => {

    // Check if all fields are filled
    if(req.body.email && req.body.username && req.body.password){
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        user.save().then(data => {
            res.status(201).send(data);
        }).catch(err => {
            if(err.errors.username){
                return res.status(500).send({
                    message: err.errors.username.message
                });
            }else if(err.errors.email){
                return res.status(500).send({
                    message: err.errors.email.message
                });
            }else{
                return res.status(500).send({
                    message: err.message || "Some error occurred while registering user"
                });
            }
        })
    } else if (req.body.loginEmail && req.body.loginPassword){
        // validate if all fields are there
        User.find({
            email: req.body.loginEmail
        }).then(data=>{
            if(data.length < 1){
                return res.status(400).send({
                    message: "Email Id Incorrect"
                })
            }
            bcrypt.compare(req.body.loginPassword, data[0].password, (err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(401).send({
                        message: "Authentication Failed"
                    })
                }
                if(result){
                    console.log(result);
                    return res.status(200).send({
                        message: 'Authentication Successful'
                    })
                }
                if(!result){
                    console.log(result);
                    return res.status(200).send({
                        message: 'Password Wrong'
                    })
                }
            })
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                message: err.message
            })
        });

    } else if(!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf){
        return res.status(400).send({
            message: "Form cannot be left blank!"
        })
    }







    // create a contact


    // saving contact instance to database

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a noteId
exports.findOne = (req,res) => {
};

// Update a note identified by the noteId in the request
exports.update = (req,res) => {
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
};