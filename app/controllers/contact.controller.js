const Contact = require('../models/contact.model');

// create and Save a post
exports.create = (req,res) => {

    // validation of the request fields
    if(!req.body.name || !req.body.email || !req.body.message){
        return res.status(400).send({
            message: "Form cannot be left blank!"
        })
    }

    // create a contact
    const contact = new Contact({
        name: req.body.name,
        message: req.body.message,
        phone: req.body.phone || 'Guy did not give phone number!',
        email: req.body.email
    });

    // saving contact instance to database

    contact.save().then(
        data => {
            res.send(data);
        }
    ).catch(
        err => {
            return res.status(500).send({
                message: err.message || "Some error occured while sending the message"
            })
        }
    )
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Contact.find().then( contacts => {
            res.send(contacts);
        }).catch( err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the contacts'
        })
    })
};

// Find a single note with a noteId
exports.findOne = (req,res) => {
    // Validate request
    Contact.findById(req.params.contactId).then(contact => {
        if(!contact){
            return res.status(404).send({
                message : "Contact with contact id"+ req.params.contactId + "not found"
            })
        }
        res.send(contact);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message : "Contact with contact id "+ req.params.contactId + " not found"
            })
        }
        return res.status(500).send({
            message : "Error Retrieving contact with id  "+ req.params.contactId
        })
    })
};

// Update a note identified by the noteId in the request
exports.update = (req,res) => {
    // Validate request
    if(!req.body.name || !req.body.email || !req.body.message){
        return res.status(400).send({
            message: "Form cannot be left blank!"
        })
    }

    // Find this parameter contact and update it with request body
    Contact.findByIdAndUpdate(req.params.contactId,{
        name: req.body.name,
        message: req.body.message,
        phone: req.body.phone || 'Fucker did not give phone number!',
        email: req.body.email
    },{new: true}).then(contact => {
        if(!contact){
            return res.status(404).send({
                message : "Contact with contact id "+ req.params.contactId + " not found"
            })
        }
        res.send(contact);
    }).catch(err=>{
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message : "Contact with contact id "+ req.params.contactId + " not found"
            })
        }
        return res.status(500).send({
            message : "Error Updating contact with id  "+ req.params.contactId
        })
    })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactId).then(contact => {
        if(!contact){
            return res.status(404).send({
                message : "Contact with contact id "+ req.params.contactId + " not found"
            })
        }
        res.send({message : "Contact Deleted Successfully"});
    }).catch(err=> {
        if(err.kind === "ObjectId" || err.name === 'NotFound'){
            return res.status(404).send({
                message : "Contact with contact id "+ req.params.contactId + " not found"
            })
        }
        return res.status(500).send({
            message : "Error deleting contact with id  "+ req.params.contactId
        });
    });
};