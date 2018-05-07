const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var session = require('express-session');

//create an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// Cors to allow different website data flow
app.use(cors());

// Using sessions on the website
app.use(session({
    secret:'work harder',
    resave: true,
    saveUninitialized: false
}));


// configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url).then(()=>{
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


// define a simple route
app.get('/', (req,res)=>{
    res.json({
        "message" : "Welcome"
    })
});

require('./app/routes/contacts.routes.js')(app);
require('./app/routes/users.routes.js')(app);

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
app.listen(port, ()=>{
    console.log("Server is running at "+ port)
});
