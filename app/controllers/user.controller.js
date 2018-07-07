const User = require('../models/user.model');

// create and Save a post
exports.create = (req,res) => {

    // Check if all fields are filled
    if(req.body.name && req.body.email && req.body.phone && req.body.pan && req.body.company){
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

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find({
        email: req.userdata.email
    }).then( users =>{
        res.status(200).send(users);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    });
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