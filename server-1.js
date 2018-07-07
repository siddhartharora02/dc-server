const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
//create an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// Cors to allow different website data flow
app.use(cors());
// configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url).then(()=>{
    console.log('Successfully connected to MongoDB server - '+ dbConfig.server_name);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


// define a simple route
app.get('/', (req,res)=>{
    res.json({
        "message" : "LoggedIn"
    })
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let mid = req.headers.referer.split("/");
        let uploads = mid[mid.length-1];
        cb(null, 'uploads1/photos/'+uploads);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
});
let upload = multer({
    storage: storage
});

app.post('/photoUpload',upload.single('photoUpload'), (req,res)=>{
    // console.log(req.body.folderId);
    res.send("Done!");
})

require('./app/routes/users.routes.js')(app);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server is running at http://localhost:"+ port)
});
