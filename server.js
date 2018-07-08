const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.use("/uploads", express.static(__dirname + '/uploads'));

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


require('./app/routes/users.routes.js')(app);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server is running at http://localhost:"+ port)
});
