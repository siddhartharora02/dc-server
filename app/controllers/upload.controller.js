const Url = require('../models/upload.model');
const multerUpload = require('../../config/upload');

// create and Save a post
exports.create = (req,res)=>{
    multerUpload.single(req.params.id)(req, res, function (err) {
        console.log(req.file.filename);
        if (err) {
            console.log("We fucked up!")
            return
        }
        console.log("Everything is fine");
        let url;
        if(req.params.id == 'photoUpload'){
            url = new Url({
                photoUrl: req.file.filename
            });
        }else if(req.params.id == 'panUpload'){
            url = new Url({
                panUrl: req.file.filename
            });
        } else if(req.params.id == 'aadharUpload'){
            url = new Url({
                aadharUrl: req.file.filename
            });
        }
        url["user_id"] = req.body.folderId;

        url.save().then(data=>{
            console.log(data);
            res.send(data);
        }).catch();
    })
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