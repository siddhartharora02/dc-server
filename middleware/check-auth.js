const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'token-checker');
        console.log(token);
        console.log(decoded);
        req.userdata = decoded;
        next();
    }catch (e) {
        res.status(401).send({
            message: "Authentication Failed - Token Expired"
        })
    }


};