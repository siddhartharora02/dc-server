const upload = require('../../config/upload');

module.exports = (app) => {
    app.post('/upload/:id', (req,res)=>{
      console.log(req.params);
        upload.single(req.params.id)(req, res, function (err) {
            if (err) {
                console.log("We fucked up!")
                return
            }

            console.log("Everything is fine")
        })
        console.log(req.params);
        res.send("Done!");
    })
};