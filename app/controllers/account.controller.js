const Account = require('../models/account.model');
exports.create = (req, res)=>{
    if(req.body.accName && req.body.accBank && req.body.accIfsc && req.body.accNumber && req.body.user_id){
        const account = new Account({
            accName : req.body.accName,
            accBank : req.body.accBank,
            accIfsc : req.body.accIfsc,
            accNumber : req.body.accNumber,
            user_id: req.body.user_id
        });
        account.save().then(data=>{
            res.send(data);
        }).catch(err=>{
            console.log(err);
        })
    }
};

exports.findOne = (req, res) => {
    console.log(req.params.id);
    Account.find({user_id:req.params.id}).then(data=>{
        res.send(data);
    });
}